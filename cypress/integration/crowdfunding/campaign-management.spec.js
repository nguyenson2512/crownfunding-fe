describe("Campaign Management", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('form input[name="email"]').type("admin@gmail.com");
    cy.get('form input[name="password"]').type("admin");
    cy.get("form").submit();
    cy.url().should("eq", "http://localhost:4200/");
    cy.visit("/admin/campaign");
  });

  it("should search for campaign by title", () => {
    const title = "Mika and the Witch's Mountain";
    cy.get('input[formControlName="title"]').type(title);
    cy.get("button").contains("Search").click();
    cy.get("ngx-datatable").should("contain", title);
  });

  it("should search for campaign by not existed title and not return value", () => {
    const title = "not existed name";
    cy.get('input[formControlName="title"]').type(title);
    cy.get("button").contains("Search").click();
    cy.get("ngx-datatable").should("not.contain", title);
  });

  it("should reset the search form", () => {
    const title = "Mika and the Witch's Mountain";
    cy.get('input[formControlName="title"]').type(title);
    cy.get("button").contains("Search").click();
    cy.get("ngx-datatable").should("contain", title);
    cy.get("button.blackBorder").click();
    cy.get('input[formControlName="title"]').should("not.contain", title);
  });

  it("should navigate to detail of campaign", () => {
    cy.wait(1000);
    cy.get("button.detail-btn").first().click();
    cy.url().should("include", "detail");
  });
});
