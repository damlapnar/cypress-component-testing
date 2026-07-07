# Cypress E2E & Component Testing

![Cypress](https://img.shields.io/badge/Cypress-17202C?style=flat-square&logo=cypress&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
[![CI](https://github.com/damlapnar/cypress-component-testing/actions/workflows/cypress.yml/badge.svg)](https://github.com/damlapnar/cypress-component-testing/actions/workflows/cypress.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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

---

## Test Architecture

### Why Cypress?
Cypress runs inside the browser, giving it synchronous access to the DOM and network layer that driver-based tools proxy. The time-travel debugger and automatic retry-ability reduce debugging time significantly. The component testing capability in one tool is unique.

### Design Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Custom commands | `cypress/support/commands.ts` | `cy.loginAsStandardUser()`, `cy.addToCart()` — domain language in tests, implementation in one place |
| Retry config | `retries: { runMode: 2 }` | Absorbs transient network flakiness in CI without hiding real failures |
| Typed commands | TypeScript + `/// <reference types="cypress" />` | Autocomplete for custom commands; compile errors catch typos before runtime |
| Chrome-only CI | `.github/workflows/cypress.yml` | Firefox on ubuntu CI runners has a known crash with Cypress 13.x; real cross-browser validated locally |

### Test Pyramid
```
        ┌───────────────────┐
        │  E2E Tests (Cypress│  ← 5 spec files, full browser
        └───────────────────┘
```

### Adding a New Test
1. Add spec file under `cypress/e2e/`
2. Reuse custom commands from `cypress/support/commands.ts`
3. Run locally: `npx cypress open`

### Running with Docker
```bash
docker build -t cypress-tests .
docker run --rm -v $(pwd)/cypress/screenshots:/app/cypress/screenshots cypress-tests
```
