// =============================================================
// FNTEC — Suite E2E : Login -> Enterprises -> Modal New Company
// =============================================================

describe('FNTEC — Création d\'entreprise', () => {

  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
  });

  it('TC-ENT-01 | Connexion, navigation et ouverture de la modale New Company', () => {
    
    // 1. Connexion
    cy.visit('https://admin.fntec.cm/auth/sign-in', { failOnStatusCode: false });

    cy.get('#userId', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type('652852911');

    cy.get('input[type="password"]')
      .first()
      .clear()
      .type('mocDi@1824'); 

    cy.contains('button', /sign in/i).click();

    // 2. Validation de la connexion
    cy.url({ timeout: 15000 }).should('include', '/admin');

    // 3. Navigation vers Enterprises (force: true contourne opacity: 0 sur la sidebar)
    cy.contains('Enterprises', { timeout: 10000 })
      .click({ force: true });

    cy.url({ timeout: 10000 }).should('include', '/admin/enterprises');

    // 4. Clic sur le bouton "+ Add"
    cy.get('.MuiButtonGroup-root', { timeout: 12000 })
      .contains('button', /add/i)
      .click({ force: true });

    // 5. Assertion : Modale "New Company" affichée
    cy.contains('header, h2, h5, div', 'New Company', { timeout: 8000 })
      .should('be.visible');
  });

});

