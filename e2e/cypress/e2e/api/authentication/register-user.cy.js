/// <reference types="cypress" />

describe("REGISTER User - (POST) /api/user", () => {
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

    // POST - /api/user/ registerUser"
    it("Verify a user is registered with valid data", () => {
        // Register credentials
        cy.request({
            method: "POST",
            url: `${apiUrl}/api/user/`,
            body: testUser,
        }).then((res) => {
            expect(res.body.message).to.eq(
                `User ${testUser.email} successfully created!`
            );
        });
    });

    // POST - /api/user/ registerUser"
    it("Verify a user is not registered with existing data", () => {
        // Register credentials
        cy.request({
            method: "POST",
            url: `${apiUrl}/api/user/`,
            body: testUser,
        }).then((res) => {
            expect(res.body.message).to.eq(
                `User ${testUser.email} successfully created!`
            );
        });

        // Register credentials again.
        cy.request({
            method: "POST",
            url: `${apiUrl}/api/user/`,
            body: testUser,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.body.error).to.eq(
                `A user with email ${testUser.email} already exists!`
            );
        });
    });
});
