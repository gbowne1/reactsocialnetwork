// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const apiUrl = "http://localhost:9000";
Cypress.Commands.add("deleteTestUsers", () => {
    return cy
        .request({
            method: "GET",
            url: `${apiUrl}/api/users/delete-test-users/`,
        })
        .then((res) => {
            expect(res.status).to.eq(204);
        });
});

Cypress.Commands.add("deleteTestPosts", () => {
    return cy
        .request({
            url: `${apiUrl}/api/posts/delete-test-posts`,
            failOnStatusCode: false,
        })
        .then((res) => {
            expect(res.status).to.eq(204);
        });
});

Cypress.Commands.add("deleteTestUsers", () => {
    return cy
        .request({
            url: "http://localhost:9000/api/users/delete-test-users",
            failOnStatusCode: false,
        })
        .then((res) => {
            expect(res.status).to.eq(204);
        });
});
