/// <reference types="cypress" />

describe("Register User", () => {
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

    const NEW_USERNAME = "testuser";
    const NEW_EMAIL = "newuser@gmail.com";
    const NEW_PASSWORD = "Test1234!";

    const EXISTING_USERNAME = "testuser";
    const EXISTING_EMAIL = "testuser@gmail.com";
    const EXISTING_PASSWORD = "Testpass1!";

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
    });

    it("Verify a new user can be registered when entering valid data and user is logged in", () => {
        const NEW_USERNAME = "testuser";
        const NEW_EMAIL = "newuser@gmail.com";
        const NEW_PASSWORD = "Test1234!";

        cy.visit("/");

        // Click on register here!
        cy.get("[data-testid=subscribe]").click();

        submitUserData(NEW_USERNAME, NEW_EMAIL, NEW_PASSWORD);

        // Check login successful snackbar appears
        cy.get('[data-testid="alert-message"]')
            .should("be.visible")
            .and("have.text", "Registered user!");

        // Check loading icon appears
        cy.get('[data-testid="loading-spinner"]').should("be.visible");

        // Check we are on homepage (dashboard page)
        checkHomepage();

        // Logout
        cy.get("[data-testid=user-menu]").click();
        cy.get("[data-testid=menu-logout]").click();

        submitUserData(NEW_USERNAME, NEW_EMAIL, NEW_PASSWORD);

        // Check we are on homepage (dashboard page)
        checkHomepage();

        // Reload page and check homepage is still visible
        cy.reload();
        checkHomepage();
    });

    it("Verify a registered user stays logged in after page reload", () => {
        const NEW_USERNAME = "testuser";
        const NEW_EMAIL = "newuser@gmail.com";
        const NEW_PASSWORD = "Test1234!";

        cy.visit("/");

        // Click on register here!
        cy.get("[data-testid=subscribe]").click();

        submitUserData(NEW_USERNAME, NEW_EMAIL, NEW_PASSWORD);

        // Check login successful snackbar appears
        cy.get('[data-testid="alert-message"]')
            .should("be.visible")
            .and("have.text", "Registered user!");

        // Check loading icon appears
        cy.get('[data-testid="loading-spinner"]').should("be.visible");

        // Check we are on homepage (dashboard page)
        checkHomepage();

        // Logout
        cy.get("[data-testid=user-menu]").click();
        cy.get("[data-testid=menu-logout]").click();

        submitUserData(NEW_USERNAME, NEW_EMAIL, NEW_PASSWORD);

        // Check we are on homepage (dashboard page)
        checkHomepage();

        // Reload page and check homepage is still visible
        cy.reload();
        checkHomepage();
    });

    it("Verify a new user cannot be registered when entering already existing credentials", () => {
        const EXISTING_USERNAME = "testuser";
        const EXISTING_EMAIL = "testuser@gmail.com";
        const EXISTING_PASSWORD = "Testpass1!";

        cy.visit("/").then(() => {
            // Add existing user localStorage users array
            const users = [];
            const existingUser = {
                username: EXISTING_USERNAME,
                email: EXISTING_EMAIL,
                password: EXISTING_PASSWORD,
            };
            users.push(existingUser);

            window.localStorage.setItem("users", JSON.stringify(users));
        });

        // Click on register here!
        cy.get("[data-testid=subscribe]").click();

        submitUserData(EXISTING_USERNAME, EXISTING_EMAIL, EXISTING_PASSWORD);

        // Check alert message is visible
        cy.get('[data-testid="alert-message"]')
            .should("be.visible")
            .and("have.text", "A user with that email is already registered!");

        // Check we are NOT on homepage (dashboard page)
        checkHomepage(false);
    });
});
