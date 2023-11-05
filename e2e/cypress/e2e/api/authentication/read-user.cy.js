/// <reference types="cypress" />

describe("READ User - (GET) /api/user", () => {
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

    // GET - /api/users getUsers
    it("Verify all existing users can be retrieved", () => {
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
    it("Verify a specific user can be retrieved", () => {
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
});
