/// <reference types="cypress" />

describe("CREATE Friend Request - (POST) /api/friend-requests", () => {
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

    it("Verify a friend request is created correctly", () => {
        // Use the testuser ids to make a friend request
        makeFriendRequest();
    });

    it("Verify a friend request is accepted correctly", () => {
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

    it("Verify a friend request is rejected correctly", () => {
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
});
