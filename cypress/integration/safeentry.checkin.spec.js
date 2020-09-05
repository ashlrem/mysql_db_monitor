var d = new Date();

describe('SafeEntry Check-In Input', () => {
    it('Click Check-In, Type NRIC/FIN and Mobile Number on fields, Submit', () => {

      cy.visit('https://www.safeentry-qr.gov.sg/tenant/PROD-200504143Z-685828-ONESYSTEMSTECHNOLOGIESPTELT-SE')
      cy.wait(500)
      cy.get(':nth-child(1) > .safeentry-check-btn').click()

       // Type on NRIC/FIN Field
      cy.get('#mat-input-1').click();
      cy.get('#mat-input-1').type(Cypress.env('nricFin'));

      // Type on NRIC/FIN Field
      cy.get('#mat-input-0').click();
      cy.get('#mat-input-0').type(Cypress.env('mobileNum'));
      
      cy.get('.mat-button-wrapper').click();
      cy.wait(1000)
      cy.screenshot(Cypress.env('nricFin') + '_' + Cypress.env('mobileNum') + '_' + d);
    })
})