/// <reference types="cypress" />

describe("Cookie Modal Section - Cookie Modal", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Verify cookie modal is closed when clicking 'Accept Necessary' and not displayed again after page reload", () => {
        cy.get("[data-testid=cookie-modal]").should("be.visible");
        cy.get("[data-testid=cookie-modal-accept-necessary-button]").click();
        cy.get("[data-testid=cookie-modal]").should("not.exist");

        cy.reload();
        cy.get("[data-testid=cookie-modal]").should("not.exist");
    });

    it("Verify cookie modal is closed when clicking 'Accept All' and not display again after page reload", () => {
        cy.get("[data-testid=cookie-modal]").should("be.visible");
        cy.get("[data-testid=cookie-modal-accept-all-button]").click();
        cy.get("[data-testid=cookie-modal]").should("not.exist");

        cy.reload();
        cy.get("[data-testid=cookie-modal]").should("not.exist");
    });

    it("Verify cookie modal is closed when clicking on the X button and display it after page reload", () => {
        cy.get("[data-testid=cookie-modal]").should("be.visible");

        //  Click outside the modal to close it
        cy.get("body").click(0, 0);
        cy.get("[data-testid=cookie-modal]").should("not.exist");

        cy.reload();
        cy.get("[data-testid=cookie-modal]").should("be.visible");
    });
});
