describe("Category Management", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('form input[name="email"]').type("admin@gmail.com");
    cy.get('form input[name="password"]').type("admin");
    cy.get("form").submit();
    cy.url().should("eq", "http://localhost:4200/");
    cy.visit("/admin/category");
  });

  it("should show add dialog when click add button", () => {
    cy.get(".add-btn").click();
    cy.get(".dialog_title").should("contain", "Add Category");
  });

  it("should show edit dialog when click edit button", () => {
    cy.wait(1000);
    cy.get(".edit-btn").first().click();
    cy.get(".dialog_title").should("contain", "Edit Category");
  });

  it("should show confirm dialog when click delete button", () => {
    cy.wait(1000);
    cy.get(".delete-btn").first().click();
    cy.get(".mat-dialog-content")
      .find("p")
      .should("have.text", "Are you sure you want to delete ?");
  });

  // mat - dialog - content;

  // it("should edit an existing category", () => {
  //   cy.get('[data-testid="edit-category-button"]').first().click();
  //   cy.get('[data-testid="category-name-input"]')
  //     .clear()
  //     .type("Updated Category");
  //   cy.get('[data-testid="save-category-button"]').click();
  // });

  // it("should delete an existing category", () => {
  //   cy.get('[data-testid="delete-category-button"]').first().click();
  //   cy.get('[data-testid="confirm-delete-button"]').click();
  // });
});
