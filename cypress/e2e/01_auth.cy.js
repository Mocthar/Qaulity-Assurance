// =============================================================
// FNTEC — Authentication Tests (MUI Fixed)
// =============================================================

describe('01 — Authentication', () => {
  beforeEach(() => {
    // Remplacement par l'URL d'authentification exacte constatée
    cy.visit('https://admin.fntec.cm/auth/sign-in', { failOnStatusCode: false });
  });

  // ── 1.1 Page load ──────────────────────────────────────────
  it('TC-AUTH-01 | Login page loads and shows required fields', () => {
    // CORRECTION : On cible le composant par son ID MUI "userId" constaté dans image_d7f982.jpg
    cy.get('#userId').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  // ── 1.2 Invalid credentials ────────────────────────────────
  it('TC-AUTH-02 | Shows error message on wrong credentials', () => {
    // On utilise l'ID réel pour taper le numéro de téléphone
    cy.get('#userId').clear().type('600000000');
    cy.get('input[type="password"]').first().clear().type('WrongPass123!');
    cy.get('button[type="submit"]').click();
    
    cy.get('[class*="error"], [class*="alert"], [role="alert"], [class*="toast"]')
      .should('be.visible');
  });

  // ── 1.4 Successful login ───────────────────────────────────
  it('TC-AUTH-04 | Logs in successfully with valid credentials', () => {
    // CORRECTION : Saisie des données de ton test initial sur le bon élément ID
    cy.get('#userId').clear().type('652852911'); 
    cy.get('input[type="password"]').first().clear().type('mocDi@1824');
    
    cy.get('button[type="submit"]').click();
    
    // Attente de la redirection après connexion réussie
    cy.url({ timeout: 12000 }).should('not.include', '/auth/sign-in');
  });
});