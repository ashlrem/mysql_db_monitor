var d = new Date();

describe('SafeEntry Check-Out Input', () => {
    it('Click Check-Out, Type NRIC/FIN and Mobile Number on fields, Submit', () => {

    cy.visit('https://www.safeentry-qr.gov.sg/tenant/PROD-200504143Z-685828-ONESYSTEMSTECHNOLOGIESPTELT-SE'), {
        timeout: 50000,
        onLoad: (contentWindow) => {
        }
    };

    cy.get(':nth-child(2) > .safeentry-check-btn').click();

    // Type on NRIC/FIN Field
    cy.get('#mat-input-1').click();
    cy.get('#mat-input-1').type(Cypress.env('nricFin'));

    // Type on Mobile Number Field
    cy.get('#mat-input-0').click()
    cy.get('#mat-input-0').type(Cypress.env('mobileNum'));

    // Click checkout button!
    cy.get('.mat-button-wrapper').click();

    // cy.wait(1500)

    // Take a screenshot of the checkin page!
    cy.screenshot(Cypress.env('nricFin') + '_' + Cypress.env('mobileNum') + '_' + d);
    })
})