// =============================================================
// FNTEC-MINEFOP — Cypress Custom Commands
// =============================================================

/**
 * Login via UI and cache session to avoid re-logging on every test
 */
Cypress.Commands.add('login', () => {
  cy.session('fntec-admin', () => {
    cy.visit('/auth/sign-in');
    cy.get('input[name="phone"], input[placeholder*="phone" i], input[type="tel"]')
      .first()
      .clear()
      .type('652852911');
    cy.get('input[name="password"], input[type="password"]')
      .first()
      .clear()
      .type('mocDi@1824');
    cy.get('button[type="submit"], button').contains(/sign in|login|connexion/i).click();
    // Wait for dashboard to confirm successful login
    cy.url().should('not.include', '/auth/sign-in');
    cy.url().should('not.include', '/login');
  });
});

/**
 * Navigate to a sidebar menu item by its visible label
 */
Cypress.Commands.add('navigateTo', (label) => {
  cy.get('nav, aside, [class*="sidebar"], [class*="menu"]')
    .contains(new RegExp(label, 'i'))
    .click();
  cy.wait(500);
});

/**
 * Open a submenu item (e.g. Enterprise > List, Enterprise > Create)
 */
Cypress.Commands.add('navigateToSubmenu', (parent, child) => {
  cy.get('nav, aside, [class*="sidebar"], [class*="menu"]')
    .contains(new RegExp(parent, 'i'))
    .click();
  cy.get('nav, aside, [class*="sidebar"], [class*="menu"]')
    .contains(new RegExp(child, 'i'))
    .click();
  cy.wait(500);
});

/**
 * Fill any visible input by its label text
 */
Cypress.Commands.add('fillField', (labelText, value) => {
  cy.contains('label', new RegExp(labelText, 'i'))
    .invoke('attr', 'for')
    .then((id) => {
      if (id) {
        cy.get(`#${id}`).clear().type(value);
      } else {
        cy.contains('label', new RegExp(labelText, 'i'))
          .parent()
          .find('input, textarea, select')
          .first()
          .clear()
          .type(value);
      }
    });
});

/**
 * Select an option from a dropdown/select by label
 */
Cypress.Commands.add('selectOption', (labelText, optionText) => {
  cy.contains('label', new RegExp(labelText, 'i'))
    .parent()
    .find('select, [class*="select"], [role="combobox"]')
    .first()
    .click();
  cy.get('[class*="option"], option, li[role="option"]')
    .contains(new RegExp(optionText, 'i'))
    .click();
});

/**
 * Confirm a modal/dialog action (delete confirmations etc.)
 */
Cypress.Commands.add('confirmDialog', () => {
  cy.get(
    '[class*="modal"] button, [role="dialog"] button, [class*="alert"] button'
  )
    .contains(/confirm|yes|delete|ok|supprimer|oui/i)
    .click();
});

/**
 * Wait for a toast/snackbar success message
 */
Cypress.Commands.add('expectSuccess', () => {
  cy.get(
    '[class*="toast"], [class*="snack"], [class*="alert"], [class*="notification"], [role="alert"]'
  )
    .should('be.visible')
    .and('contain.text', /success|créé|mis à jour|supprimé|saved|created|updated|deleted/i);
});

/**
 * Apply a filter field by label and value
 */
Cypress.Commands.add('applyFilter', (labelOrPlaceholder, value) => {
  cy.get(
    `input[placeholder*="${labelOrPlaceholder}" i], input[aria-label*="${labelOrPlaceholder}" i]`
  )
    .first()
    .clear()
    .type(value);
  cy.wait(600); // debounce
});

/**
 * Clear all active filters (reset button)
 */
Cypress.Commands.add('clearFilters', () => {
  cy.get('button')
    .contains(/reset|clear|réinitialiser|effacer/i)
    .click({ failOnStatusCode: false });
  cy.wait(400);
});