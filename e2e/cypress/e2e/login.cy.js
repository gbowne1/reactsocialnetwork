/// <reference types="cypress" />
describe("Login component tests", () => {
  it("should login with hardcoded testuser credentials", () => {
    const TEST_USERNAME = "testuser1";
    const TEST_EMAIL = "testuser@gmail.com";
    const TEST_PASSWORD = "Testpass1!";

    cy.visit("http://localhost:3000/");

    // Close cookie modal
    cy.get("[data-testid=cookie-modal-close-button]").click();

    // Input username
    cy.get('[data-testid="username"]')
      .type(TEST_USERNAME)
      .should("have.value", TEST_USERNAME);

    // Input username
    cy.get('[data-testid="email"]')
      .type(TEST_EMAIL)
      .should("have.value", TEST_EMAIL);

    // Input username
    cy.get('[data-testid="password"]')
      .type(TEST_PASSWORD)
      .should("have.value", TEST_PASSWORD);

    // Click on submit
    cy.get('[data-testid="submit"]').click();

    // Check login successful snackbar appears
    cy.get('[data-testid="alert-message"]')
      .should("be.visible")
      .and("have.text", "Login successful!");

    // Check loading icon appears
    cy.get('[data-testid="loading-spinner"]').should("be.visible");

    // Check we are on homepage (dashboard page)

    // Toolbar is visible
    cy.get(".MuiToolbar-root").should("be.visible");

    // Section app is visible
    cy.get(".Section-app").should("be.visible");

    // Dashboard panel is visble
    cy.get(".Panel").should("be.visible");
  });

  it("should NOT login with un-registed credentials", () => {
    const UNREGISTERED_USERNAME = "SomeUsername";
    const UNREGISTERED_EMAIL = "SomeEmail@mail.com";
    const UNREGISTERED_PASSWORD = "SomePassword123!";

    cy.visit("http://localhost:3000/");

    // Close cookie modal
    cy.get("[data-testid=cookie-modal-close-button]").click();

    // Input username
    cy.get('[data-testid="username"]')
      .type(UNREGISTERED_USERNAME)
      .should("have.value", UNREGISTERED_USERNAME);

    // Input username
    cy.get('[data-testid="email"]')
      .type(UNREGISTERED_EMAIL)
      .should("have.value", UNREGISTERED_EMAIL);

    // Input username
    cy.get('[data-testid="password"]')
      .type(UNREGISTERED_PASSWORD)
      .should("have.value", UNREGISTERED_PASSWORD);

    // Click on submit
    cy.get('[data-testid="submit"]').click();

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

    // Input username
    cy.get('[data-testid="username"]')
      .type(NEW_USERNAME)
      .should("have.value", NEW_USERNAME);

    // Input username
    cy.get('[data-testid="email"]')
      .type(NEW_EMAIL)
      .should("have.value", NEW_EMAIL);

    // Input username
    cy.get('[data-testid="password"]')
      .type(NEW_PASSWORD)
      .should("have.value", NEW_PASSWORD);

    // Click on register here!
    cy.get(".subscribe").click();

    // Click on submit
    cy.get('[data-testid="submit"]').click();

    // Check login successful snackbar appears
    cy.get('[data-testid="alert-message"]')
      .should("be.visible")
      .and("have.text", "Registered user!");

    // Check loading icon appears
    cy.get('[data-testid="loading-spinner"]').should("be.visible");

    // Check we are on homepage (dashboard page)

    // Toolbar is visible
    cy.get(".MuiToolbar-root").should("be.visible");

    // Section app is visible
    cy.get(".Section-app").should("be.visible");

    // Dashboard panel is visble
    cy.get(".Panel").should("be.visible");

    // Logout
    cy.get("[data-testid=user-menu]").click();
    cy.get("[data-testid=logout-button]").click();

    // Remove cookie popup again
    cy.get("[data-testid=cookie-modal-close-button]").click();

    // Type new credentials
    // Input username
    cy.get('[data-testid="username"]')
      .type(NEW_USERNAME)
      .should("have.value", NEW_USERNAME);

    // Input username
    cy.get('[data-testid="email"]')
      .type(NEW_EMAIL)
      .should("have.value", NEW_EMAIL);

    // Input username
    cy.get('[data-testid="password"]')
      .type(NEW_PASSWORD)
      .should("have.value", NEW_PASSWORD);

    // Click on submit
    cy.get('[data-testid="submit"]').click();

    // Check we are on homepage (dashboard page)

    // Toolbar is visible
    cy.get(".MuiToolbar-root").should("be.visible");

    // Section app is visible
    cy.get(".Section-app").should("be.visible");

    // Dashboard panel is visble
    cy.get(".Panel")
      .should("be.visible")
      .then(() => {
        console.log(localStorage);
        console.log(localStorage.getItem("users"));
      });

    cy.then((some) => {
      window.localStorage.setItem("A", { a: "a" });
      console.log(window.localStorage);
    });
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

    // Input username
    cy.get('[data-testid="username"]')
      .type(EXISTING_USERNAME)
      .should("have.value", EXISTING_USERNAME);

    // Input username
    cy.get('[data-testid="email"]')
      .type(EXISTING_EMAIL)
      .should("have.value", EXISTING_EMAIL);

    // Input username
    cy.get('[data-testid="password"]')
      .type(EXISTING_PASSWORD)
      .should("have.value", EXISTING_PASSWORD);

    // Click on register here!
    cy.get(".subscribe").click();

    // Click on submit
    cy.get('[data-testid="submit"]').click();

    // Check alert message is visible
    cy.get('[data-testid="alert-message"]')
      .should("be.visible")
      .and("have.text", "A user with that email is already registered!");

    // Check we are NOT on homepage (dashboard page)

    // Toolbar is visible
    cy.get(".MuiToolbar-root").should("not.exist");

    // Section app is visible
    cy.get(".Section-app").should("not.exist");

    // Dashboard panel is visble
    cy.get(".Panel").should("not.exist");
  });
});
