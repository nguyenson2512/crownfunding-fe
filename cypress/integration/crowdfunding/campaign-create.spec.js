describe("Campaign Create", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('form input[name="email"]').type("CrisGamer@gmail.com");
    cy.get('form input[name="password"]').type("CrisGamer");
    cy.get("form").submit();
    cy.url().should("eq", "http://localhost:4200/");
    cy.visit("/campaigns/create");
  });

  it("should display input field with correct label and placeholder text", () => {
    cy.get('[formControlName="title"]').should(
      "have.attr",
      "data-placeholder",
      "Title"
    );

    cy.get('[formControlName="subTitle"]').should(
      "have.attr",
      "data-placeholder",
      "Sub Title"
    );

    cy.get('[formControlName="location"]').should(
      "have.attr",
      "data-placeholder",
      "Location"
    );
    cy.get('[formControlName="fundingGoal"]').should(
      "have.attr",
      "data-placeholder",
      "Funding Goal"
    );
    cy.get('[formControlName="duration"]').should(
      "have.attr",
      "data-placeholder",
      "Campaign End Date"
    );
    cy.get('[formControlName="targetLaunchDate"]').should(
      "have.attr",
      "data-placeholder",
      "Target Launch Date"
    );
  });
});
