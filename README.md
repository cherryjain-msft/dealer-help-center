# dealer-help-center

Customer help articles for dealer service appointments. Articles are Markdown files in `articles/` and are published to the customer help center.

> Fictional demo content.

## Articles

| Article | Topic |
| --- | --- |
| [book-an-appointment.md](articles/book-an-appointment.md) | Booking by phone or on the dealer's website |
| [cancel-or-change-an-appointment.md](articles/cancel-or-change-an-appointment.md) | Canceling and changing appointments |
| [appointment-statuses.md](articles/appointment-statuses.md) | What each appointment status means |
| [drop-off-and-check-in.md](articles/drop-off-and-check-in.md) | Drop-off, key drop and check-in |
| [fees-and-charges.md](articles/fees-and-charges.md) | Fees |
| [faq.md](articles/faq.md) | Common questions |

## Writing guidelines

- Start every article with front matter: `title`, `audience` (`customers` or `dealers`) and `last_reviewed` (YYYY-MM-DD).
- Write plain, friendly US English. Use "canceled" and "canceling" with one l, and "cancellation" with two.
- Use the status labels in the product team's appointment status glossary.
- Update `last_reviewed` whenever you change an article.
- Link to other articles with relative links.

## Check articles

Requires Node.js 20 or later. There are no dependencies to install.

```bash
npm test
```

The check validates front matter and relative links.

## Related repositories

- [dealer-appointments-api](https://github.com/cherryjain-msft/dealer-appointments-api): appointment data and cancellation.
- [dealer-customer-portal](https://github.com/cherryjain-msft/dealer-customer-portal): the customer portal.
