// Without this export, TypeScript treats the file as a global script rather
// than a module, and `declare global` below is only valid inside a module -
// every custom command ended up untyped (TS2669/TS2315) and every spec file
// that called cy.login()/loginAsStandardUser()/addToCart() failed to
// type-check as a result (TS2339/TS2551).
export {};

Cypress.Commands.add('login', (username: string, password: string) => {
  if (username) cy.get('[data-test="username"]').type(username);
  if (password) cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('loginAsStandardUser', () => {
  cy.visit('/');
  cy.login(
    Cypress.env('username') || 'standard_user',
    Cypress.env('password') || 'secret_sauce'
  );
  cy.url().should('include', 'inventory');
});

Cypress.Commands.add('addToCart', (productName: string) => {
  cy.contains('.inventory_item', productName)
    .find('button')
    .click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
      loginAsStandardUser(): Chainable<void>;
      addToCart(productName: string): Chainable<void>;
    }
  }
}
