/// <reference types="cypress" />

describe("Login tests", () => {
  const submitUserData = (username, email, pass) => {
    // Input username
    cy.get('[data-testid="username"]')
      .type(username)
      .should("have.value", username);

    // Input email
    cy.get('[data-testid="email"]').type(email).should("have.value", email);

    // Input password
    cy.get('[data-testid="password"]').type(pass).should("have.value", pass);

    // Click on submit
    cy.get('[data-testid="submit"]').click();
  };

  const checkHomepage = (exists = true) => {
    // Toolbar is visible
    cy.get(".MuiToolbar-root").should(exists ? "be.visible" : "not.exist");

    // Section app is visible
    cy.get(".Section-app").should(exists ? "be.visible" : "not.exist");

    // Dashboard panel is visble
    cy.get(".Panel").should(exists ? "be.visible" : "not.exist");
  };

  it("should login with hardcoded testuser credentials", () => {
    const TEST_USERNAME = "testuser1";
    const TEST_EMAIL = "testuser@gmail.com";
    const TEST_PASSWORD = "Testpass1!";

    cy.visit("http://localhost:3000/");

    // Close cookie modal
    cy.get("[data-testid=cookie-modal-close-button]").click();

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

  it("should NOT login with un-registed credentials", () => {
    const UNREGISTERED_USERNAME = "SomeUsername";
    const UNREGISTERED_EMAIL = "SomeEmail@mail.com";
    const UNREGISTERED_PASSWORD = "Somepassword123!";

    cy.visit("http://localhost:3000/");

    // Close cookie modal
    cy.get("[data-testid=cookie-modal-close-button]").click();

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

  it("should register a new user, then login successfully with those credentials", () => {
    const NEW_USERNAME = "Manuel";
    const NEW_EMAIL = "manuelpinedacabeza@gmail.com";
    const NEW_PASSWORD = "Test1234!";

    cy.visit("http://localhost:3000/");

    // Close cookie modal
    cy.get("[data-testid=cookie-modal-close-button]").click();

    // Click on register here!
    cy.get(".subscribe").click();

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

    // Remove cookie popup again
    cy.get("[data-testid=cookie-modal-close-button]").click();

    submitUserData(NEW_USERNAME, NEW_EMAIL, NEW_PASSWORD);

    // Check we are on homepage (dashboard page)
    checkHomepage();
  });

  it("should NOT register a new user with already existing credentials", () => {
    const EXISTING_USERNAME = "testuser1";
    const EXISTING_EMAIL = "testuser@gmail.com";
    const EXISTING_PASSWORD = "Testpass1!";

    cy.visit("http://localhost:3000/").then(() => {
      // Add existing user localStorage users array
      const users = [];
      const existingUser = {
        username: EXISTING_USERNAME,
        email: EXISTING_EMAIL,
        password: EXISTING_PASSWORD,
      };
      users.push(existingUser);

      window.localStorage.setItem("users", JSON.stringify(users));
      console.log(window.localStorage);
    });

    // Close cookie modal
    cy.get("[data-testid=cookie-modal-close-button]").click();

    // Click on register here!
    cy.get(".subscribe").click();

    submitUserData(EXISTING_USERNAME, EXISTING_EMAIL, EXISTING_PASSWORD);

    // Check alert message is visible
    cy.get('[data-testid="alert-message"]')
      .should("be.visible")
      .and("have.text", "A user with that email is already registered!");

    // Check we are NOT on homepage (dashboard page)
    checkHomepage(false);
  });

  it("should display error labels when leaving required inputs empty or on validation errors", () => {
    cy.visit("http://localhost:3000/");

    // Close cookie modal
    cy.get("[data-testid=cookie-modal-close-button]").click();

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
      .and("have.text", "password must contain at least 1 uppercase letter");

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
