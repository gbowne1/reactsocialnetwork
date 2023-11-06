/// <reference types="cypress" />

describe("UPDATE User - (PATCH) /api/user/:id", () => {
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

    // PATCH - /api/user/:id updateUser
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

            // Create updated user data
            const updatedUser = {
                username: "testuser",
                email: "nottestuser@gmail.com",
                password: "654321",
            };

            // Update user with such data
            cy.request({
                method: "PATCH",
                url: `${apiUrl}/api/user/${userId}`,
                body: updatedUser,
            }).then((res) => {
                expect(res.body.message).to.eq("User successfully updated!");
                expect(res.body.data.name).to.eq(updatedUser.name);
                expect(res.body.data.email).to.eq(updatedUser.email);
            });
        });
    });
});
