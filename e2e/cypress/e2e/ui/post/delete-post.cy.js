/// <reference types="cypress" />

import {
    lastLoginCredentials,
    addLastLoginCredentialsToLocalStorage,
    addCookiesAcceptedToLocalStorage,
} from "../../../utils/utils";

const createPost = () => {
    cy.get("[data-testid=create-post-form]").should("be.visible");
    cy.get("[data-testid=create-post-input]")
        .clear()
        .type("Test post")
        .and("have.value", "Test post");
    cy.get("[data-testid=create-post-submit-button]").click();
};

const removeAllPosts = () => {
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
};

describe("Post Section - Delete Post", () => {
    beforeEach(() => {
        // Load the app and seed localstorage with cookiesAccepted key to true
        // and add credentials in order  to bypass login screen
        cy.visit("/").then(() => {
            addCookiesAcceptedToLocalStorage();
            addLastLoginCredentialsToLocalStorage();
        });

        cy.visit("/");

        // Delete all test post records
        cy.deleteTestPosts();
    });

    it("Verify a post is removed when clicking on the post's close button", () => {
        removeAllPosts();
        cy.get("[data-testid=post]").should("not.exist");
    });

    after(() => {
        // Delete all test post records
        cy.deleteTestPosts();
    });
});
