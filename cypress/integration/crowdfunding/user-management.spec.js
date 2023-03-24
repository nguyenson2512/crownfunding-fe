describe("User Management", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('form input[name="email"]').type("admin@gmail.com");
    cy.get('form input[name="password"]').type("admin");
    cy.get("form").submit();
    cy.url().should("eq", "http://localhost:4200/");
    cy.visit("/admin/user");
  });

  it("should reset the search form", () => {
    const username = "admin";
    cy.get('input[formControlName="username"]').type(username);
    cy.get(".search-btn").click();
    cy.get("ngx-datatable").should("contain", username);
    cy.get("button.blackBorder").click();
    cy.get('input[formControlName="username"]').should("not.contain", username);
  });

  it("should search for user by username", () => {
    const username = "admin";
    cy.get('input[formControlName="username"]').type(username);
    cy.get(".search-btn").click();
    cy.get("ngx-datatable").should("contain", username);
  });

  it("should search and not return value", () => {
    const username = "not existed name";
    cy.get('input[formControlName="username"]').type(username);
    cy.get(".search-btn").click();
    cy.get("ngx-datatable").should("not.contain", username);
  });
});
