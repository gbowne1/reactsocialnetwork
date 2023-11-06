/// <reference types="cypress" />

describe("LOGIN User - (POST) /api/login", () => {
    const apiUrl = "http://localhost:9000";

    const testUser = {
        username: "testuser",
        email: "testuser1@gmail.com",
        password: "123456",
    };

    const users = [
        {
            username: "testuser",
            email: "testuser1@gmail.com",
            password: "123456",
        },
        {
            username: "testuser",
            email: "testuser2@gmail.com",
            password: "123456",
        },
        {
            username: "testuser",
            email: "testuser3@gmail.com",
            password: "123456",
        },
    ];

    beforeEach(() => {
        // Delete all db records
        cy.deleteTestUsers();
    });

    // POST - /api/login loginUser
    it("Verify a user is logged in with valid data", () => {
        // Register user
        cy.request({
            method: "POST",
            url: `${apiUrl}/api/user/`,
            body: testUser,
        }).then((res) => {
            expect(res.body.message).to.eq(
                `User ${testUser.email} successfully created!`
            );
        });

        cy.request({
            method: "POST",
            url: `${apiUrl}/api/login`,
            body: testUser,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.body.message).to.eq("User successfully logged in!");
        });
    });

    it("Verify a user is not logged in with invalid data", () => {
        cy.request({
            method: "POST",
            url: `${apiUrl}/api/login`,
            body: testUser,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.body.error).to.eq(
                `User ${testUser.email} does not exists, register a user first!`
            );
        });
    });
});
