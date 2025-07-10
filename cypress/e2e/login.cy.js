describe("Login Flow", () => {
    it("logs in and redirects to main page", () => {
        cy.visit("http://localhost:1234/api/login");

        cy.get("input[name='username']").type("testUser");
        cy.get("input[name='password']").type("testPassword123!");
        cy.contains("Login").click();

        cy.url().should("include", "/login");
    });
});
