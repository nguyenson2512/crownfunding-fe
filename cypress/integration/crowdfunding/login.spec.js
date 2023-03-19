describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should display login form with email and password fields", () => {
    cy.get(".login_page_title").should("exist");
    cy.get(".auth-form").should("exist");
    cy.get('[formControlName="email"]').should("exist");
    cy.get('[formControlName="password"]').should("exist");
  });

  //
  it("should show validation error messages for invalid form fields", () => {
    cy.get('[formControlName="email"]').type("invalidemail");
    cy.get(".login_page").click();
    cy.get(".validation_error").should("exist");
    cy.get('[formControlName="password"]').type(" ");
    cy.get(".login_page").click();
    cy.get(".validation_error").should("exist");
  });

  it("should show validation error message when login form is submitted with empty fields", () => {
    cy.get("form").submit();
    cy.get(".validation_error").should("exist");
  });

  it("should show error message for incorrect credentials", () => {
    cy.get('[formControlName="email"]').type("incorrectemail@test.com");
    cy.get('[formControlName="password"]').type("incorrectpassword");
    cy.get('.auth-form button[type="submit"]').click();
    cy.get(".mat-dialog-content p").should("be.visible");
  });

  it("should redirect to home page after successful login", () => {
    cy.get('form input[name="email"]').type("CrisGamer@gmail.com");
    cy.get('form input[name="password"]').type("CrisGamer");
    cy.get("form").submit();
    cy.url().should("eq", "http://localhost:4200/");
  });

  it("should navigate to signup page when signup link is clicked", () => {
    cy.contains("Sign up").click();
    cy.url().should("eq", "http://localhost:4200/signup");
  });
});
