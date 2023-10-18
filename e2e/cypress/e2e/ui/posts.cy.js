/// <reference types="cypress" />

import {
    lastLoginCredentials,
    addLastLoginCredentialsToLocalStorage,
    addCookiesAcceptedToLocalStorage,
} from "../../utils/utils";

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do`;

describe("Post tests", () => {
    const apiUrl = "http://localhost:9000";

    beforeEach(() => {
        // Load the app and seed localstorage with cookiesAccepted key to true
        // and add credentials in order  to bypass login screen
        cy.visit("http://localhost:3000/").then(() => {
            addCookiesAcceptedToLocalStorage();
            addLastLoginCredentialsToLocalStorage();
        });

        cy.visit("http://localhost:3000/");

        // Delete all test post records
        cy.request({
            url: `${apiUrl}/api/posts/delete-test-posts`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.body.message).to.eq("Posts deleted!");
        });
    });

    it("should display posts, post elements and texts", () => {
        cy.get("[data-testid=post]").each((post) => {
            cy.get(post).within(() => {
                cy.get("[data-testid=account-image]").should("be.visible");
                cy.get("[data-testid=account-name]").should("be.visible");

                cy.get("[data-testid=post-date]")
                    .should("be.visible")
                    .and("have.text", new Date().toDateString());

                cy.get("[data-testid=post-close-button]").should("be.visible");

                cy.get("[data-testid=post-text]").should("be.visible");

                cy.get("[data-testid=post-image]").should("be.visible");
            });
        });
    });

    it("should remove post when clicking on the post's close button", () => {
        cy.get("[data-testid=post]")
            .should("be.visible")
            .then((posts) => {
                // Get initial posts amount
                const initialPostsAmount = posts.length;

                // Use to click on the close button that many times
                for (let i = 0; i < initialPostsAmount; i++) {
                    cy.get("[data-testid=post-close-button]").first().click();
                    cy.wait(200);
                }
            });

        cy.get("[data-testid=post]").should("not.exist");
    });

    it("should create a post when submitting post form", () => {
        cy.get("[data-testid=create-post-form]").should("be.visible");
        cy.get("[data-testid=create-post-input]")
            .clear()
            .type("Test post")
            .and("have.value", "Test post");
        cy.get("[data-testid=create-post-submit-button]").click();

        cy.get("[data-testid=post]")
            .first()
            .within(() => {
                // Check account name
                cy.get("[data-testid=account-name]")
                    .should("be.visible")
                    .and("contain.text", lastLoginCredentials.username);

                // Check account image
                cy.get('[data-testid="account-image"]')
                    .should("have.attr", "src")
                    .and("include", lastLoginCredentials.accountImageUrl);

                // Check post text
                cy.get("[data-testid=post-text]")
                    .should("be.visible")
                    .and("contain.text", "Test post");
            });

        cy.get("[data-testid=create-post-input]")
            .clear()
            .type("Second Test post")
            .and("have.value", "Second Test post");
        cy.get("[data-testid=create-post-submit-button]").click();

        cy.get("[data-testid=post]")
            .first()
            .within(() => {
                cy.get("[data-testid=account-name]")
                    .should("be.visible")
                    .and("contain.text", lastLoginCredentials.username);

                cy.get("[data-testid=post-text]")
                    .should("be.visible")
                    .and("contain.text", "Test post");
            });
    });

    after(() => {
        // Delete all test post records
        cy.request({
            url: `${apiUrl}/api/posts/delete-test-posts`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.body.message).to.eq("Posts deleted!");
        });
    });
});
