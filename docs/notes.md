# Notes

## Tips and Points

- A test should verify behavior, not just perform actions.
- Different behaviors should generally be independent tests.
- Assertions are what make an automation script a meaningful test.
- Use meaningful, stable locators.
- getByRole() uses a role + accessible name.
- Locator chaining lets you target an element within a specific component.
- Different test data doesn't necessarily mean different test behavior.
- Keep the code simple until there's a real reason to introduce abstraction.
- Don't convert everything into data-driven tests just because it can be.


## Concepts

### Assertion levels

1. **Elemental:**: Is the UI element in the expected state?
2.  **Business**: Is the business workflow as per the requirement?
3.  **Application**: Is the application workflow as per the business requirement and technically accurate?

### Fixtures

Reusable setup for referencing repeatable behaviour

> Last updated: v0 - 27-09-2026