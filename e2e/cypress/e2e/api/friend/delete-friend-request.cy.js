/// <reference types="cypress" />

describe("DELETE Friend Request - (DELETE) /api/friend-requests", () => {
    const apiUrl = "http://localhost:9000";

    const testuser1 = {
        username: "testuser1",
        email: "testuser1@gmail.com",
        password: "123456",
    };

    const testuser2 = {
        username: "testuser2",
        email: "testuser2@gmail.com",
        password: "123456",
    };
    const testusers = [testuser1, testuser2];
    const ctx = {};

    const makeFriendRequest = () => {
        return cy
            .request({
                method: "POST",
                url: `${apiUrl}/api/friend-requests/`,
                body: {
                    userId: ctx.testuser1,
                    friendId: ctx.testuser2,
                },
            })
            .then((res) => {
                expect(res.status).to.eq(201);
                expect(res.body.message).to.eq(
                    `Friend request sent successfully`
                );
                ctx.friendshipId = res.body.id;
            });
    };

    beforeEach(() => {
        // Delete test users if they exists
        cy.deleteTestUsers();

        // Register users
        testusers.map((testuser, i) => {
            cy.request({
                method: "POST",
                url: `${apiUrl}/api/user/`,
                body: testuser,
                failOnStatusCode: false,
            }).then((res) => {
                console.log(res);
                expect(res.body.message).to.eq(
                    `User ${testuser.email} successfully created!`
                );

                // Save testuser ids on ctx
                ctx[`testuser${i + 1}`] = res.body.id;
            });
        });
    });

    it("Verify a specific friend request can be deleted", () => {
        // Use the testuser ids to make a friend request
        makeFriendRequest().then(() => {
            // Get the id from the friendship
            console.log(ctx.friendshipId);

            // Unfriend the request
            cy.request({
                method: "DELETE",
                url: `${apiUrl}/api/friends/${ctx.friendshipId}/`,
                body: {
                    userId: ctx.testuser1,
                    friendId: ctx.testuser2,
                },
            }).then((res) => {
                expect(res.status).to.eq(204);
            });
        });
    });
});
