/// <reference types="cypress" />

describe("READ Event - (GET) /api/event/", () => {
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
    it("Verify all existing events can be retrieved", () => {
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

    // GET - /api/event/:id getEvent
    it("Verify a specific event can be retrieved", () => {
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
});
