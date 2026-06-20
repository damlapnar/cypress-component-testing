describe('Checkout Flow', () => {
  beforeEach(() => {
    cy.loginAsStandardUser();
    cy.addToCart('Sauce Labs Backpack');
    cy.get('.shopping_cart_link').click();
  });

  it('should complete checkout successfully', () => {
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type('Damla');
    cy.get('[data-test="lastName"]').type('Pinar');
    cy.get('[data-test="postalCode"]').type('10001');
    cy.get('[data-test="continue"]').click();
    cy.get('.summary_info').should('be.visible');
    cy.get('[data-test="finish"]').click();
    cy.get('.complete-header').should('contain', 'Thank you');
  });

  it('should show error when first name is missing', () => {
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('contain', 'First Name is required');
  });
});
