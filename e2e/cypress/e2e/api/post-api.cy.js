/// <reference types="cypress" />

describe("Post API tests", () => {
    const apiUrl = "http://localhost:9000";

    const testPost = {
        accountImage: "https://avatars.githubusercontent.com/u/4129325?v=4",
        accountName: "Test user",
        postDate: new Date().toDateString(),
        postText: "Test post API",
        postImage:
            "https://static.vecteezy.com/system/resources/previews/012/168/187/non_2x/beautiful-sunset-on-the-beach-with-palm-tree-for-travel-and-vacation-free-photo.JPG",
    };

    const updatedPost = {
        accountImage: "https://avatars.githubusercontent.com/u/4129325?v=4",
        accountName: "Updated Test user",
        postDate: new Date().toDateString(),
        postText: "Test post API",
        postImage:
            "https://static.vecteezy.com/system/resources/previews/012/168/187/non_2x/beautiful-sunset-on-the-beach-with-palm-tree-for-travel-and-vacation-free-photo.JPG",
    };

    beforeEach(() => {
        // Delete all test post records
        cy.request({
            url: `${apiUrl}/api/posts/delete-test-posts`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.body.message).to.eq("Posts deleted!");
        });
    });

    // GET - /api/posts getPosts
    it("GET - /api/posts - should retrieve all existing posts data when requesting", () => {
        cy.request(`${apiUrl}/api/posts/`).then((res) => {
            expect(Array.isArray(res.body.data)).to.be.true;
            expect(res.body.data.length).to.eq(3);
        });
    });

    // GET - /api/post/:id getPost
    it("GET - /api/post/:id - should retrieve specific post data when requesting", () => {
        cy.request(`${apiUrl}/api/post/${2}`).then((res) => {
            expect(res.body.message).to.eq("Post successfully retrieved!");
        });
    });

    // POST - /api/post/:id createPost
    it("POST - /api/post/:id - should create a post when requesting with valid data", () => {
        cy.request(`${apiUrl}/api/post/${2}`).then((res) => {
            expect(res.body.message).to.eq("Post successfully retrieved!");
        });

        cy.request({
            method: "POST",
            url: `${apiUrl}/api/post/`,
            body: testPost,
        }).then((res) => {
            expect(res.body.message).to.eq(
                `Post from ${testPost.accountName} successfully created!`
            );
        });
    });

    // PATCH - /api/post/:id updatePost
    it("PATCH  - /api/post/:id - should update a specific post's data when requesting", () => {
        // Register post and save it's id
        cy.request({
            method: "POST",
            url: `${apiUrl}/api/post/`,
            body: testPost,
        }).then((res) => {
            expect(res.body.message).to.eq(
                `Post from ${testPost.accountName} successfully created!`
            );

            const eventId = res.body.id;

            cy.request({
                method: "PATCH",
                url: `${apiUrl}/api/post/${eventId}`,
                body: updatedPost,
            }).then((res) => {
                expect(res.body.message).to.eq(`Post successfully updated!`);

                expect(res.body.data.accountImage).to.eq(
                    updatedPost.accountImage
                );
                expect(res.body.data.accountName).to.eq(
                    updatedPost.accountName
                );
                expect(res.body.data.postDate).to.eq(updatedPost.postDate);
                expect(res.body.data.postText).to.eq(updatedPost.postText);
                expect(res.body.data.postImage).to.eq(updatedPost.postImage);
            });
        });
    });

    // DELETE - /api/post/:id deletePost
    it("DELETE - /api/post/:id - should delete a specific post when requesting", () => {
        // Register post and save it's id
        cy.request({
            method: "POST",
            url: `${apiUrl}/api/post/`,
            body: testPost,
        }).then((res) => {
            expect(res.body.message).to.eq(
                `Post from ${testPost.accountName} successfully created!`
            );

            const eventId = res.body.id;

            cy.request({
                method: "DELETE",
                url: `${apiUrl}/api/post/${eventId}`,
                body: testPost,
            }).then((res) => {
                expect(res.body.message).to.eq(`Post successfully deleted!`);
            });
        });
    });

    after(() => {
        // Delete all test post records
        cy.request({
            url: `${apiUrl}/api/posts/delete-test-posts`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.body.message).to.eq("Posts deleted!");
        });
    });
});
