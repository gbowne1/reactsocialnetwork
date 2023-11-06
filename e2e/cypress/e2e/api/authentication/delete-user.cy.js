/// <reference types="cypress" />

describe("DELETE User - (DELETE) /api/user/:id", () => {
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

    // DELETE - /api/user/:id deleteUser
    it("Verify a specific user's data can be updated", () => {
        // Register user
        cy.request({
            method: "POST",
            url: `${apiUrl}/api/user/`,
            body: testUser,
        }).then((res) => {
            expect(res.body.message).to.eq(
                `User ${testUser.email} successfully created!`
            );

            // Get user id
            const userId = res.body.id;

            // Delete user
            cy.request({
                method: "DELETE",
                url: `${apiUrl}/api/user/${userId}`,
            }).then((res) => {
                expect(res.body.message).to.eq("User successfully deleted!");
            });

            // Make sure user cannot be reached by request
            cy.request({
                method: "GET",
                url: `${apiUrl}/api/user/${userId}`,
            }).then((res) => {
                expect(res.body.message).to.eq(
                    `User with id: ${userId} not found.`
                );
            });
        });
    });
});
