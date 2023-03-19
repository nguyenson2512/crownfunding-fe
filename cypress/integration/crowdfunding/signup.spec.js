describe("Signup Page", () => {
  beforeEach(() => {
    cy.visit("/signup");
    cy.fixture("test-image.png").as("image");
  });

  it("should display all form fields", () => {
    cy.get('[formControlName="username"]').should("exist");
    cy.get('[formControlName="email"]').should("exist");
    cy.get('[formControlName="password"]').should("exist");
    cy.get('[formControlName="confirmPassword"]').should("exist");
  });

  it("should show validation error messages for invalid form fields", () => {
    cy.get('[formControlName="email"]').type("invalidemail");
    cy.get(".signup_page_form").click();
    cy.get(".validation_error").should("exist");
    cy.get('[formControlName="password"]').type(" ");
    cy.get(".signup_page_form").click();
    cy.get(".validation_error").should("exist");
  });

  it("should show validation error message when login form is submitted with empty fields", () => {
    cy.get("form").submit();
    cy.get(".validation_error").should("exist");
  });

  it("should sign up a user", () => {
    // fill out form fields
    cy.get('[formControlName="username"]').type("Test User");
    cy.get('[formControlName="email"]').type("testuser@example.com");
    cy.get('[formControlName="password"]').type("password");
    cy.get('[formControlName="confirmPassword"]').type("password");

    cy.get("input[type=file]").attachFile("test-image.png", {
      force: true,
    });

    // Assert that the file has been attached successfully
    cy.get("input[type=file]")
      .should("have.prop", "files")
      .and("have.length", 1);

    // submit form
    cy.get('[type="submit"]').click();
    // verify user is redirected to login page
    cy.wait(5000);
    cy.url().should("eq", "http://localhost:4200/login");
  });
});
