# Cypress E2E & Component Testing

![Cypress](https://img.shields.io/badge/Cypress-17202C?style=flat-square&logo=cypress&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
[![CI](https://github.com/damlapnar/cypress-component-testing/actions/workflows/cypress.yml/badge.svg)](https://github.com/damlapnar/cypress-component-testing/actions/workflows/cypress.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

End-to-end test suite for [saucedemo.com](https://www.saucedemo.com) built with Cypress 13 and TypeScript. Features custom commands, full checkout flow coverage, and CI via GitHub Actions.

Despite the repository name, there's no actual component testing set up here — `cypress.config.ts` only defines an `e2e` block, and there's no UI of this project's own to component-test (the suite drives an external site end-to-end). Setting up real component testing would mean building components first; until then, this is an E2E suite.

## Features

- **Custom Commands** — `cy.login()`, `cy.loginAsStandardUser()`, `cy.addToCart()`
- **Full E2E Coverage** — login, inventory, cart, checkout, and product-detail flows
- **Type-Checked** — `npm run typecheck` catches command misuse and typos at compile time
- **Video & Screenshot** — auto-captured on failure
- **Retry Logic** — configurable retries for flaky tests

## Test Coverage

| Suite | File | Scenarios |
|-------|------|-----------|
| Login | `login.cy.ts` | Valid/invalid creds, locked user, validation |
| Inventory | `inventory.cy.ts` | Products, cart, sorting |
| Cart | `cart.cy.ts` | Add/remove items, persistence, continue shopping |
| Checkout | `checkout.cy.ts` | Full flow, validation errors, cancel |
| Product Detail | `product-detail.cy.ts` | Product info, add to cart, back navigation |

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

# Type-check without running the suite
npm run typecheck
```

---

## Test Architecture

### Why Cypress?
Cypress runs inside the browser, giving it synchronous access to the DOM and network layer that driver-based tools proxy. The time-travel debugger and automatic retry-ability reduce debugging time significantly.

### Design Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Custom commands | `cypress/support/commands.ts` | `cy.loginAsStandardUser()`, `cy.addToCart()` — domain language in tests, implementation in one place |
| Retry config | `retries: { runMode: 2 }` | Absorbs transient network flakiness in CI without hiding real failures |
| Typed commands | TypeScript + `declare global` in `commands.ts` | Autocomplete for custom commands; `npm run typecheck` catches command typos before runtime. The file needs an explicit `export {}` — without it, TypeScript treats it as a script rather than a module and the `declare global` augmentation silently fails, leaving every custom command untyped |
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
