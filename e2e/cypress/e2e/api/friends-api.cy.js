/// <reference types="cypress" />

describe("Friends API tests", () => {
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

    it("POST - /api/friend-requests/ - should create a friend request", () => {
        // Use the testuser ids to make a friend request
        makeFriendRequest();
    });

    it("POST - /api/friend-requests/ - should accept a friend request", () => {
        // Use the testuser ids to make a friend request
        makeFriendRequest().then(() => {
            // Get the id from the friendship
            console.log(ctx.friendshipId);

            // Accept the friend request
            cy.request({
                method: "POST",
                url: `${apiUrl}/api/friend-requests/accept/${ctx.friendshipId}/`,
                body: {
                    userId: ctx.testuser1,
                    friendId: ctx.testuser2,
                },
            }).then((res) => {
                expect(res.status).to.eq(201);
                expect(res.body.message).to.eq(
                    `Friend request accepted successfully`
                );
            });
        });
    });

    it("POST - /api/friend-requests/ - should reject a friend request", () => {
        // Use the testuser ids to make a friend request
        makeFriendRequest().then(() => {
            // Get the id from the friendship
            console.log(ctx.friendshipId);

            // Accept the friend request
            cy.request({
                method: "POST",
                url: `${apiUrl}/api/friend-requests/reject/${ctx.friendshipId}/`,
                body: {
                    userId: ctx.testuser1,
                    friendId: ctx.testuser2,
                },
            }).then((res) => {
                expect(res.status).to.eq(201);
                expect(res.body.message).to.eq(
                    `Friend request rejected successfully`
                );
            });
        });
    });

    it("GET - /api/friend-requests/ - should retrieve a user's friends", () => {
        // Use the testuser ids to make a friend request
        makeFriendRequest().then(() => {
            // Get the id from the friendship
            console.log(ctx.friendshipId);

            // Accept the friend request
            cy.request({
                method: "POST",
                url: `${apiUrl}/api/friend-requests/accept/${ctx.friendshipId}/`,
                body: {
                    userId: ctx.testuser1,
                    friendId: ctx.testuser2,
                },
            }).then((res) => {
                expect(res.status).to.eq(201);
                expect(res.body.message).to.eq(
                    `Friend request accepted successfully`
                );
            });
        });

        // Retrieve user's friends
        cy.request({
            method: "GET",
            url: `${apiUrl}/api/users/${ctx.testuser1}/friends`,
        }).then((res) => {
            console.log(res.body.friends);
            const friends = res.body.friends;
            expect(Array.isArray(friends)).to.be.true;
        });
    });

    it("GET - /api/friend-requests/ - should retrieve a user's friend requests received", () => {
        // Use the testuser ids to make a friend request
        makeFriendRequest();

        // Retrieve user's friend requests received
        cy.request({
            method: "GET",
            url: `${apiUrl}/api/friend-requests/received/${ctx.testuser2}`,
        }).then((res) => {
            console.log(res);
            const friendRequests = res.body.friendRequests;
            expect(Array.isArray(friendRequests)).to.be.true;
        });
    });

    it("GET - /api/friend-requests/ - should retrieve a user's friend requests sent", () => {
        // Use the testuser ids to make a friend request
        makeFriendRequest();

        // Retrieve user's friend requests sent
        cy.request({
            method: "GET",
            url: `${apiUrl}/api/friend-requests/sent/${ctx.testuser1}`,
        }).then((res) => {
            console.log(res);
            const sentFriendRequests = res.body.sentFriendRequests;
            expect(Array.isArray(sentFriendRequests)).to.be.true;
        });
    });

    it("DELETE - /api/friend-requests/ - should retrieve unfriend a users", () => {
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
