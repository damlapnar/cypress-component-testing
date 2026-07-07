describe('Product Detail Page', () => {
  beforeEach(() => {
    cy.loginAsStandardUser();
    cy.get('.inventory_item_name').first().click();
  });

  it('should display product name, price and description', () => {
    cy.get('.inventory_details_name').should('be.visible');
    cy.get('.inventory_details_price').should('be.visible');
    cy.get('.inventory_details_desc').should('be.visible');
  });

  it('should show price starting with $', () => {
    cy.get('.inventory_details_price').invoke('text').should('match', /^\$/);
  });

  it('should add item to cart from detail page', () => {
    cy.get('[data-test^="add-to-cart"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });

  it('should show Remove button after adding to cart', () => {
    cy.get('[data-test^="add-to-cart"]').click();
    cy.get('[data-test^="remove"]').should('be.visible');
  });

  it('should navigate back to inventory', () => {
    cy.get('[data-test="back-to-products"]').click();
    cy.url().should('include', 'inventory');
    cy.url().should('not.include', 'inventory-item');
  });
});
