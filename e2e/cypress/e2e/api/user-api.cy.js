/// <reference types="cypress" />

describe("User API tests", () => {
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
        cy.request({
            url: "http://localhost:9000/api/users/delete-test-users",
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.body.message).to.eq("Users deleted!");
        });
    });

    // POST - /api/login loginUser
    it("POST - /api/login - should NOT login when entering unexisting credentials", () => {
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

    it("POST - /api/login - should login when requesting with existing credentials", () => {
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

    // POST - /api/user/ registerUser"
    it("POST -  /api/user - should register a user when requesting with valid credentials", () => {
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
    it("POST -  /api/user - should NOT register a user when requesting with exisiting credentials", () => {
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

    // GET - /api/users getUsers
    it("GET - /api/users - should retrieve all existing users data when requesting", () => {
        // Check how many users are there initially and save that amount.
        let initialUsersAmount;
        cy.request(`${apiUrl}/api/users/`).then((res) => {
            expect(Array.isArray(res.body.data)).to.be.true;
            initialUsersAmount = res.body.data.length;
        });

        // Create 3 users
        users.map((user) => {
            cy.request({
                method: "POST",
                url: `${apiUrl}/api/user/`,
                body: user,
            }).then((res) => {
                expect(res.body.message).to.eq(
                    `User ${user.email} successfully created!`
                );
            });
        });

        // Check there are 3 more user than initial users amount.
        cy.request(`${apiUrl}/api/users/`).then((res) => {
            expect(res.body.data.length).to.eq(initialUsersAmount + 3);
        });
    });

    // GET - /api/user/:id getUser
    it("GET - /api/user/:id - should retrieve specific user data when requesting", () => {
        const userIds = [];

        // Create 3 users and save their ids
        users.map((user) => {
            cy.request({
                method: "POST",
                url: `${apiUrl}/api/user/`,
                body: user,
            }).then((res) => {
                expect(res.body.message).to.eq(
                    `User ${user.email} successfully created!`
                );
                userIds.push(res.body.id);
            });
        });

        // Get newly created users...
        // and their ids...

        // Get users by id and check their name and emails are correct
        userIds.map((id, i) => {
            cy.request(`${apiUrl}/api/user/${id}`).then((res) => {
                expect(res.body.message).to.eq("User successfully retrieved!");
                expect(res.body.data.name).to.eq(users[i].name);
                expect(res.body.data.email).to.eq(users[i].email);
            });
        });
    });

    // PATCH - /api/user/:id updateUser
    it("PATCH - /api/user/:id - should update a specific user's data when requesting", () => {
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

    // DELETE - /api/user/:id deleteUser
    it("DELETE - /api/user/:id - should delete a specific user when requesting", () => {
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
