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

  it('should show error when last name is missing', () => {
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type('Damla');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('contain', 'Last Name is required');
  });

  it('should show error when postal code is missing', () => {
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type('Damla');
    cy.get('[data-test="lastName"]').type('Pinar');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('contain', 'Postal Code is required');
  });

  it('should show order summary on step two', () => {
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type('Damla');
    cy.get('[data-test="lastName"]').type('Pinar');
    cy.get('[data-test="postalCode"]').type('10001');
    cy.get('[data-test="continue"]').click();
    cy.url().should('include', 'checkout-step-two');
    cy.get('.cart_item').should('be.visible');
    cy.get('.summary_total_label').should('be.visible');
  });

  it('should cancel from step one and return to cart', () => {
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="cancel"]').click();
    cy.url().should('include', 'cart');
  });

  it('should cancel from step two and return to inventory', () => {
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type('Damla');
    cy.get('[data-test="lastName"]').type('Pinar');
    cy.get('[data-test="postalCode"]').type('10001');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="cancel"]').click();
    cy.url().should('include', 'inventory');
  });
});
