# Cypress E2E & Component Testing

![Cypress](https://img.shields.io/badge/Cypress-17202C?style=flat-square&logo=cypress&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white)

End-to-end and component test suite built with Cypress 13 and TypeScript. Features custom commands, full checkout flow coverage, and cross-browser CI via GitHub Actions.

## Features

- **Custom Commands** — `cy.login()`, `cy.loginAsStandardUser()`, `cy.addToCart()`
- **Full E2E Coverage** — login, inventory, checkout flows
- **Cross-Browser** — Chrome and Firefox via GitHub Actions matrix
- **Video & Screenshot** — auto-captured on failure
- **Retry Logic** — configurable retries for flaky tests

## Test Coverage

| Suite | File | Scenarios |
|-------|------|-----------|
| Login | `login.cy.ts` | Valid/invalid creds, locked user, validation |
| Inventory | `inventory.cy.ts` | Products, cart, sorting |
| Checkout | `checkout.cy.ts` | Full flow, validation errors |

## Getting Started

```bash
npm install
```

## Running Tests

```bash
# Open Cypress Test Runner
npm run cy:open

# Run headless (all browsers)
npm run cy:run

# Chrome only
npm run cy:run:chrome

# Firefox only
npm run cy:run:firefox
```
