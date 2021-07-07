/// <reference types="cypress" />

context('Cookies', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/sights-list');
    cy.contains('ADD NEW');
    cy.get('a').contains('ADD NEW').click();
  });

  it('should show required fields', () => {
    cy.get('input[formControlName="name"]').focus().blur();
    cy.contains('Name is required');
    cy.get('input[formControlName="longitude"]').focus().blur();
    cy.contains('Longitude is required');
    cy.get('input[formControlName="latitude"]').focus().blur();
    cy.contains('Latitude is required');
    cy.get('select[formControlName="country"]').focus().blur();
    cy.contains('Country name is required');
    cy.get('textarea[formControlName="description"]').focus().blur();
    cy.contains('Description is required');
    cy.get('select[formControlName="color"]').focus().blur();
    cy.contains('Color name is required');
  });

  it('should show validation error fields', () => {
    cy.get('input[formControlName="longitude"]').type('200.52').blur();
    cy.contains('Longitude is out of range');
    cy.get('input[formControlName="latitude"]').type('800.4').blur();
    cy.contains('Latitude is out of range');
    cy.get('textarea[formControlName="description"]').type('s'.repeat(300)).blur();
    cy.contains('Description max length is 256');
  });

  it('should add new sight', () => {
    cy.get('input[formControlName="name"]').type('Adam Mickiewicz');
    cy.get('input[formControlName="longitude"]').type('19.937908385437343');
    cy.get('input[formControlName="latitude"]').type('50.06150072587465');
    cy.get('select[formControlName="country"]').select('PL');
    cy.get('textarea[formControlName="description"]').type('Pomnik Adama Mickiewicza w Krakowie');
    cy.get('select[formControlName="color"]').select('1');
    cy.get('button[type="submit"]').click();
    cy.contains('Operation successfully ended');
  });
});
