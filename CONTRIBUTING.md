# Contributing to cypress-component-testing

Thank you for your interest in contributing!

## Getting Started

```bash
git clone https://github.com/damlapnar/cypress-component-testing.git
cd cypress-component-testing
npm install
```

## Running Tests

```bash
npm run cy:run
npm run cy:open
```

## Guidelines

- Follow the existing code style and naming conventions
- Add tests for any new functionality
- New custom commands go in `cypress/support/commands.ts` and must be typed on `Cypress.Chainable` — run `npm run typecheck` before committing, since a missing `export {}` at the top of that file silently breaks every command's types
- Keep commits small and focused with descriptive messages
- Open an issue before submitting large changes

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Commit your changes with a descriptive message
4. Push to your fork and open a Pull Request against `main`
5. Ensure all CI checks pass

## Reporting Bugs

Open a GitHub Issue with:
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, browser/runtime version)
