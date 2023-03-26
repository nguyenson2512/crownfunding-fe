describe("Home Component", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the campaign boxes", () => {
    cy.get("div.campaign-list")
      .find("app-campaign-box")
      .should("have.length.gt", 0);
  });

  it("should search for an item return value", () => {
    cy.get('input[formControlName="searchInput"]').type("The");
    cy.get("button[mat-raised-button]").click();
    cy.get("div.campaign-list")
      .find("app-campaign-box")
      .should("have.length.gt", 0);
  });

  it("should search for an item and not found result", () => {
    cy.get('input[formControlName="searchInput"]').type("not existed");
    cy.get("button[mat-raised-button]").click();
    cy.get("div.campaign-list")
      .find("app-campaign-box")
      .should("have.length", 0);
  });

  it("should search for all item of category", () => {
    cy.get("span.category").contains("Comic").click();
    cy.get("div.campaign-list")
      .find("app-campaign-box")
      .should("have.length", 0);
  });

  it("should search for all item of category", () => {
    cy.get("span.category").contains("Comic").click();
    cy.get("div.campaign-list")
      .find("app-campaign-box")
      .should("have.length", 0);
  });

  it("should navigate to detail of campaign", () => {
    cy.get("app-campaign-box").contains("sky").click();
    cy.url().should("include", "/campaign");
  });
});
