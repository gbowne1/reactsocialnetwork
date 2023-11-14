/// <reference types="cypress" />

describe("UPDATE Event - (PATCH) /api/event/:id", () => {
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

    it("Verify a specific event's data can be updated", () => {
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
});
