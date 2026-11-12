'use strict';

// Checks every article for required front matter and working relative links.

const fs = require('node:fs');
const path = require('node:path');

const ARTICLES_DIR = path.join(__dirname, '..', 'articles');
const AUDIENCES = ['customers', 'dealers'];
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function parseFrontMatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return null;
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (pair) fields[pair[1]] = pair[2].trim();
  }
  return fields;
}

function checkArticle(name) {
  const text = fs.readFileSync(path.join(ARTICLES_DIR, name), 'utf8');
  const fields = parseFrontMatter(text);
  if (!fields) return ['missing front matter'];

  const errors = [];
  if (!fields.title) errors.push('missing title');
  if (!AUDIENCES.includes(fields.audience)) {
    errors.push(`audience must be one of: ${AUDIENCES.join(', ')}`);
  }
  const reviewed = fields.last_reviewed || '';
  if (!DATE_PATTERN.test(reviewed) || Number.isNaN(Date.parse(reviewed))) {
    errors.push('last_reviewed must be a date in YYYY-MM-DD format');
  }

  for (const [, target] of text.matchAll(/\]\(([^)\s]+)\)/g)) {
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const linked = path.resolve(ARTICLES_DIR, target.split('#')[0]);
    if (!fs.existsSync(linked)) errors.push(`broken link: ${target}`);
  }
  return errors;
}

const names = fs.readdirSync(ARTICLES_DIR).filter((name) => name.endsWith('.md')).sort();
let failed = 0;

for (const name of names) {
  const errors = checkArticle(name);
  if (errors.length === 0) {
    console.log(`✓ articles/${name}`);
    continue;
  }
  failed += 1;
  for (const error of errors) console.log(`✗ articles/${name}: ${error}`);
}

console.log(`\n${names.length - failed} of ${names.length} articles passed.`);
if (failed > 0) process.exitCode = 1;
