/// <reference types="cypress" />

describe("DELETE Event - (DELETE) /api/event/:id", () => {
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

    beforeEach(() => {
        // Delete all db records
        cy.request({
            url: "http://localhost:9000/api/events/delete-test-events",
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.body.message).to.eq("Events deleted!");
        });
    });

    it("Verify a specific event's data can be deleted", () => {
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
});
