/// <reference types="cypress" />

import { addLastLoginCredentialsToLocalStorage } from "../../../utils/utils";

describe("Top Navigation Section - Top Nav", () => {
    beforeEach(() => {
        // Load the app and seed localstorage with credentials
        cy.visit("/").then(() => {
            addLastLoginCredentialsToLocalStorage();
        });
    });

    it("Verify all elements are present in the navbar and clicking on them navigates to the correct pages", () => {
        // Load app again to dashboard screen
        cy.visit("/");

        // Check navbar is visible
        cy.get("[data-testid=top-nav]").should("be.visible");

        // Check burger menu
        cy.get('[data-testid="burger-menu-button"]').should("be.visible");

        // Open side menu
        cy.get('[data-testid="burger-menu-button"]').click();

        cy.get(".SideNav").should("be.visible");

        // Close side menu
        cy.get("#react-burger-cross-btn").click();
        cy.get(".SideNav").should("not.be.visible");

        // Check logo
        cy.get('[data-testid="logo"]').should("be.visible");

        // Check search input
        cy.get('[data-testid="search"]').should("be.visible");

        // Check messages icon
        cy.get('[data-testid="search"]').should("be.visible");

        // Check chat icon
        cy.get('[data-testid="search"]').should("be.visible");

        // Check notification bell
        cy.get('[data-testid="notification-bell"]').should("be.visible");

        // Check user profile icon
        cy.get('[data-testid="user-menu"]').should("be.visible");

        // Click user profile icon
        cy.get('[data-testid="user-menu"]').click();

        // Click on settings and check settings panel appears
        cy.get('[data-testid="menu-settings"]').should("be.visible");
        cy.get('[data-testid="menu-settings"]').click();
        cy.get("[data-testid=settings-panel]")
            .should("be.visible")
            .and("contain.text", "Settings");

        // Click user profile icon
        cy.get('[data-testid="user-menu"]').click();

        // Click on help and check help panel appears
        cy.get('[data-testid="menu-help"]').should("be.visible");
        cy.get('[data-testid="menu-help"]').click();
        cy.get("[data-testid=help-panel]")
            .should("be.visible")
            .and("contain.text", "Help center");

        // Click user profile icon
        cy.get('[data-testid="user-menu"]').click();

        // Click on feedback, check feedback modal appears, and click on 'GO BACK'
        cy.get('[data-testid="menu-feedback"]').should("be.visible");
        cy.get('[data-testid="menu-feedback"]').click();
        cy.get('[data-testid="feedback"]').should("be.visible");
        cy.get('[href="/help"] > .MuiButtonBase-root').click();

        // Click user profile icon
        cy.get('[data-testid="user-menu"]').click();

        cy.get('[data-testid="menu-my-account"]').should("be.visible");
        cy.get('[data-testid="menu-my-account"]').click();

        // Check theme switch is visible, click on it and check app has dark-mode class
        cy.get('[data-testid="theme-switch"]').should("be.visible");
        cy.get('[data-testid="theme-switch"]').click();
        cy.get("[data-testid=app]").should("have.class", "dark-mode");

        // Click on theme switch again and check app now has light-mode class
        cy.get('[data-testid="theme-switch"]').click();
        cy.get("[data-testid=app]").should("have.class", "light-mode");

        // Click user profile icon
        cy.get('[data-testid="user-menu"]').click();

        // Check logout is visible and click
        cy.get('[data-testid="menu-logout"]').should("be.visible");
        cy.get('[data-testid="menu-logout"]').click();

        // Check we are on login page
        cy.get('[data-testid="form"]').should("be.visible");
    });
});
