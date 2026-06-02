describe('Cart', () => {
  beforeEach(() => {
    cy.loginAsStandardUser();
  });

  it('should show added item in cart', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.get('.shopping_cart_link').click();
    cy.get('.cart_item').should('have.length', 1);
    cy.contains('.cart_item', 'Sauce Labs Backpack').should('be.visible');
  });

  it('should remove item from cart', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('.cart_item').should('not.exist');
  });

  it('should persist cart across page navigation', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.visit('/inventory.html');
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });
});
