/// <reference types="cypress" />

describe("Event API tests", () => {
    const apiUrl = "http://localhost:9000";

    const testEvent = {
        date: new Date().toLocaleDateString(),
        title: "Test event",
        locationName: "Test event location",
        locationUrl: "http://test-event.com/location/",
        imageUrl: "http://test-event.com/image-1/",
        attendance: "Going",
        participationInterested: 43,
        participationGoing: 22,
    };

    const updatedEvent = {
        date: new Date().toLocaleDateString(),
        title: "Updated test event",
        locationName: "Test event location",
        locationUrl: "http://new-test-event.com/new-location/",
        imageUrl: "http://new-test-event.com/image-1/",
        attendance: "Interested",
        participationInterested: 10,
        participationGoing: 9,
    };

    beforeEach(() => {
        // Delete all db records
        cy.request({
            url: "http://localhost:9000/api/events/delete-test-events",
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.body.message).to.eq("Events deleted!");
        });
    });

    // GET - /api/events getEvents
    it("GET - /api/events - should retrieve all existing events data when requesting", () => {
        // Check how many events are there initially and save that amount
        let initialEventsAmount;
        cy.request(`${apiUrl}/api/events/`).then((res) => {
            expect(Array.isArray(res.body.data)).to.be.true;
            initialEventsAmount = res.body.data.length;
        });

        // Create 1 event
        cy.request({
            method: "POST",
            url: `${apiUrl}/api/event/`,
            body: testEvent,
        }).then((res) => {
            expect(res.body.message).to.eq(
                `Event ${testEvent.title} successfully created!`
            );
        });

        // Check there is 1 more event than initial events amount
        cy.request(`${apiUrl}/api/events/`).then((res) => {
            expect(res.body.data.length).to.eq(initialEventsAmount + 1);
        });
    });

    it("GET - /api/event/:id - should retrieve specific event data when requesting", () => {
        // Create 1 event and save it's id
        cy.request({
            method: "POST",
            url: `${apiUrl}/api/event/`,
            body: testEvent,
        }).then((res) => {
            expect(res.body.message).to.eq(
                `Event ${testEvent.title} successfully created!`
            );
            const eventId = res.body.id;

            // Get event by id and check all fields are correct
            cy.request(`${apiUrl}/api/event/${eventId}`).then((res) => {
                expect(res.body.message).to.eq("Event successfully retrieved!");
                expect(res.body.data.title).to.eq(testEvent.title);
                expect(res.body.data.locationName).to.eq(
                    testEvent.locationName
                );
                expect(res.body.data.locationUrl).to.eq(testEvent.locationUrl);
                expect(res.body.data.imageUrl).to.eq(testEvent.imageUrl);
                expect(res.body.data.attendance).to.eq(testEvent.attendance);
                expect(res.body.data.participationInterested).to.eq(
                    testEvent.participationInterested
                );
                expect(res.body.data.participationGoing).to.eq(
                    testEvent.participationGoing
                );
            });
        });
    });

    it("POST - /api/event - should register an event when requesting with valid data", () => {
        cy.request({
            method: "POST",
            url: `${apiUrl}/api/event/`,
            body: testEvent,
        }).then((res) => {
            expect(res.body.message).to.eq(
                `Event ${testEvent.title} successfully created!`
            );
        });
    });

    it("PATCH - /api/event/:id - should update a specific event's data when requesting", () => {
        // Register event and save it's id
        cy.request({
            method: "POST",
            url: `${apiUrl}/api/event/`,
            body: testEvent,
        }).then((res) => {
            expect(res.body.message).to.eq(
                `Event ${testEvent.title} successfully created!`
            );
            const eventId = res.body.id;

            // Update event with updatedEvent data
            cy.request({
                method: "PATCH",
                url: `${apiUrl}/api/event/${eventId}`,
                body: updatedEvent,
            }).then((res) => {
                expect(res.body.message).to.eq("Event successfully updated!");
                expect(res.body.data.title).to.eq(updatedEvent.title);
                expect(res.body.data.locationName).to.eq(
                    updatedEvent.locationName
                );
                expect(res.body.data.locationUrl).to.eq(
                    updatedEvent.locationUrl
                );
                expect(res.body.data.imageUrl).to.eq(updatedEvent.imageUrl);
                expect(res.body.data.attendance).to.eq(updatedEvent.attendance);
                expect(res.body.data.participationInterested).to.eq(
                    updatedEvent.participationInterested
                );
                expect(res.body.data.participationGoing).to.eq(
                    updatedEvent.participationGoing
                );
            });
        });
    });

    it("DELETE - /api/event/:id - shoudld delete a specific event when requesting", () => {
        // Register event and save it's id
        cy.request({
            method: "POST",
            url: `${apiUrl}/api/event/`,
            body: testEvent,
        }).then((res) => {
            expect(res.body.message).to.eq(
                `Event ${testEvent.title} successfully created!`
            );
            const eventId = res.body.id;

            // Delete event
            cy.request({
                method: "DELETE",
                url: `${apiUrl}/api/event/${eventId}`,
            }).then((res) => {
                expect(res.body.message).to.eq("Event successfully deleted!");
            });

            // Make sure user cannot be reached by request
            cy.request({
                method: "GET",
                url: `${apiUrl}/api/event/${eventId}`,
            }).then((res) => {
                expect(res.body.message).to.eq(
                    `Event with id: ${eventId} not found.`
                );
            });
        });
    });

    after(() => {
        // Delete all db records
        cy.request({
            url: "http://localhost:9000/api/events/delete-test-events",
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.body.message).to.eq("Events deleted!");
        });
    });
});
