// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('priliminarycheck', () => { 
    cy.get('img.logo+span').invoke('text').should('eq', ' OWASP Juice Shop ')
    cy.get('button[class=\'mat-focus-indicator close-dialog mat-raised-button mat-button-base mat-primary ng-star-inserted\']').click();
    cy.get('a[aria-label=\'dismiss cookie message\']').click()
    cy.get('button[mattooltipposition=\'below\'][class=\'mat-focus-indicator mat-tooltip-trigger mat-button mat-button-base\']').click();
    cy.get('mat-nav-list[role=\'navigation\']>a[routerlink=\'/contact\']>span>span[class=\'menu-text truncate\']').click();
})