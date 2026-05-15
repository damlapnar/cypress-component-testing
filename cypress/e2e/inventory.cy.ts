describe('Inventory', () => {
  beforeEach(() => {
    cy.loginAsStandardUser();
  });

  it('should display 6 products', () => {
    cy.get('.inventory_item').should('have.length', 6);
  });

  it('should add item to cart', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });

  it('should add multiple items to cart', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.addToCart('Sauce Labs Bike Light');
    cy.get('.shopping_cart_badge').should('have.text', '2');
  });

  it('should sort products A to Z', () => {
    cy.get('[data-test="product_sort_container"]').select('az');
    cy.get('.inventory_item_name').first().should('have.text', 'Sauce Labs Backpack');
  });

  it('should sort products by price low to high', () => {
    cy.get('[data-test="product_sort_container"]').select('lohi');
    cy.get('.inventory_item_price').first().should('have.text', '$7.99');
  });

  it('should navigate to cart', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', 'cart');
    cy.get('.cart_item').should('have.length', 1);
  });
});
