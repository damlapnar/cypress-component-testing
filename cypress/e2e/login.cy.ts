describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should login with valid credentials', () => {
    cy.login('standard_user', 'secret_sauce');
    cy.url().should('include', 'inventory');
  });

  it('should show error for invalid credentials', () => {
    cy.login('invalid_user', 'wrong_password');
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'do not match');
  });

  it('should show error for locked out user', () => {
    cy.login('locked_out_user', 'secret_sauce');
    cy.get('[data-test="error"]').should('contain', 'locked out');
  });

  it('should require username', () => {
    cy.login('', 'secret_sauce');
    cy.get('[data-test="error"]').should('contain', 'Username is required');
  });

  it('should require password', () => {
    cy.login('standard_user', '');
    cy.get('[data-test="error"]').should('contain', 'Password is required');
  });
});
