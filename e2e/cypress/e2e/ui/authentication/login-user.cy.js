/// <reference types="cypress" />

describe("Login User", () => {
    const submitUserData = (username, email, pass) => {
        // Input username
        cy.get('[data-testid="username"]')
            .type(username)
            .should("have.value", username);

        // Input email
        cy.get('[data-testid="email"]').type(email).should("have.value", email);

        // Input password
        cy.get('[data-testid="password"]')
            .type(pass)
            .should("have.value", pass);

        // Click on submit
        cy.get('[data-testid="submit"]').click();
    };

    const checkHomepage = (exists = true) => {
        // Toolbar is visible
        cy.get("[data-testid=top-nav]").should(
            exists ? "be.visible" : "not.exist"
        );

        // Timeline is visble
        cy.get("[data-testid=timeline]").should(
            exists ? "be.visible" : "not.exist"
        );
    };

    const TEST_USERNAME = "testuser1";
    const TEST_EMAIL = "testuser@gmail.com";
    const TEST_PASSWORD = "Testpass1!";

    const UNREGISTERED_USERNAME = "SomeUsername";
    const UNREGISTERED_EMAIL = "SomeEmail@mail.com";
    const UNREGISTERED_PASSWORD = "Somepassword123!";

    beforeEach(() => {
        // Delete all db records
        cy.request({
            url: "http://localhost:9000/api/users/delete-test-users",
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(204);
        });

        // Add cookiesAccepted: true so that cookies modal does not appear/
        window.localStorage.setItem("cookiesAccepted", JSON.stringify(true));

        cy.visit("/");
    });

    it("Verify user can login with hardcoded testuser credentials", () => {
        submitUserData(TEST_USERNAME, TEST_EMAIL, TEST_PASSWORD);

        // Check login successful snackbar appears
        cy.get('[data-testid="alert-message"]')
            .should("be.visible")
            .and("have.text", "Login successful!");

        // Check loading icon appears
        cy.get('[data-testid="loading-spinner"]').should("be.visible");

        // Check we are on homepage (dashboard page)
        checkHomepage();
    });

    it("Verify user stays logged in after page reload", () => {
        submitUserData(TEST_USERNAME, TEST_EMAIL, TEST_PASSWORD);

        // Check login successful snackbar appears
        cy.get('[data-testid="alert-message"]')
            .should("be.visible")
            .and("have.text", "Login successful!");

        // Check loading icon appears
        cy.get('[data-testid="loading-spinner"]').should("be.visible");

        // Check we are on homepage (dashboard page)
        checkHomepage();

        // Reload page and check homepage is still visible
        cy.reload();
        checkHomepage();
    });

    it("Verify user cannot login with invalid credentials", () => {
        submitUserData(
            UNREGISTERED_USERNAME,
            UNREGISTERED_EMAIL,
            UNREGISTERED_PASSWORD
        );

        // Check alert message is visible
        cy.get('[data-testid="alert-message"]')
            .should("be.visible")
            .and(
                "have.text",
                "Credentials are not valid. Register a new user first!"
            );
    });

    it("Verify input error labels and validation error messages are displayed", () => {
        // Click on submit
        cy.get('[data-testid="submit"]').click();

        // Check username helper text
        cy.get("#username-helper-text")
            .should("be.visible")
            .and("have.text", "Username is a required field");

        // Check email helper text
        cy.get("#email-helper-text")
            .should("be.visible")
            .and("have.text", "Email is a required field");

        // Check password helper text
        cy.get("#password-helper-text")
            .should("be.visible")
            .and("have.text", "password must be at least 8 characters");

        // Add a username with less than 6 characters
        cy.get('[data-testid="username"]')
            .type("ABCDE")
            .should("have.value", "ABCDE");

        // Add an invalid email
        cy.get('[data-testid="email"]')
            .type("invalidEmail.com")
            .should("have.value", "invalidEmail.com");

        cy.get('[data-testid="submit"]').click();

        // Check username helper text
        cy.get("#username-helper-text")
            .should("be.visible")
            .and("have.text", "Username must be at least 6 characters");

        // Check email helper text
        cy.get("#email-helper-text")
            .should("be.visible")
            .and("have.text", "Email must be a valid email");

        // Add a password with just 8 characters
        cy.get('[data-testid="password"]')
            .type("football")
            .should("have.value", "football");

        cy.get('[data-testid="submit"]').click();

        // Check password helper text
        cy.get("#password-helper-text")
            .should("be.visible")
            .and(
                "have.text",
                "password must contain at least 1 uppercase letter"
            );

        // Add a password with just 8 characters and 1 uppercase letter
        cy.get('[data-testid="password"]')
            .clear()
            .type("Football")
            .should("have.value", "Football");

        cy.get('[data-testid="submit"]').click();

        // Check password helper text
        cy.get("#password-helper-text")
            .should("be.visible")
            .and("have.text", "password must contain at least 1 number");

        // Add a password with just 8 characters and 1 uppercase letter and 1 number
        cy.get('[data-testid="password"]')
            .clear()
            .type("Football1")
            .should("have.value", "Football1");

        cy.get('[data-testid="submit"]').click();

        // Check password helper text
        cy.get("#password-helper-text")
            .should("be.visible")
            .and("have.text", "password must contain at least 1 symbol");

        // Add a password with just 8 characters and 1 uppercase letter and 1 number and 1 symbol
        cy.get('[data-testid="password"]')
            .clear()
            .type("Football1!")
            .should("have.value", "Football1!");

        cy.get('[data-testid="submit"]').click();

        // Check password helper text is not visible
        cy.get("#password-helper-text").should("not.be.visible");
    });
});
