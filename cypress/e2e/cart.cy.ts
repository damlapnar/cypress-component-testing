describe('Cart', () => {
  beforeEach(() => {
    cy.loginAsStandardUser();
  });

  it('should add item and show cart badge', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });

  it('should show added item in cart', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.get('.shopping_cart_link').click();
    cy.get('.cart_item').should('contain', 'Sauce Labs Backpack');
  });

  it('should show multiple items in cart', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.addToCart('Sauce Labs Bike Light');
    cy.get('.shopping_cart_badge').should('have.text', '2');
    cy.get('.shopping_cart_link').click();
    cy.get('.cart_item').should('have.length', 2);
  });

  it('should remove item from cart', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('.cart_item').should('not.exist');
  });

  it('should persist cart after page reload', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.reload();
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });

  it('should display item price in cart', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.get('.shopping_cart_link').click();
    cy.get('.inventory_item_price').should('contain', '$');
  });

  it('should continue shopping from cart', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="continue-shopping"]').click();
    cy.url().should('include', 'inventory');
  });
});
