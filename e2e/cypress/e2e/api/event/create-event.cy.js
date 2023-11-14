/// <reference types="cypress" />

describe("CREATE Event - (POST) /api/event/", () => {
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

    it("Verify an event is created with valid data", () => {
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
});
