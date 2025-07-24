describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the hero section", () => {
    cy.get("h1").should("contain", "THE BRIDGE");
    cy.get("main").should("be.visible");
  });

  it("should navigate to letter page", () => {
    cy.get('a[href*="letter-to-dungy"]').first().click();
    cy.url().should("include", "/letter-to-dungy");
  });

  it("should have interactive elements working", () => {
    // Test navigation menu
    cy.get("nav").should("be.visible");

    // Test button interaction
    cy.contains("button", "Learn More").first().should("be.visible");
  });

  it("should load sections properly", () => {
    // Check for key sections
    cy.contains("A Vision For Justice").should("be.visible");

    // Scroll down to ensure more content loads
    cy.scrollTo(0, 500);
    cy.wait(300); // Wait for animations

    // Check for content that appears after scrolling
    cy.contains("h2", "What The Bridge Could Be").should("be.visible");
  });
});
