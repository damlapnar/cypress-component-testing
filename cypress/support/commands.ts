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
