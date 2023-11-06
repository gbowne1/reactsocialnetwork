/// <reference types="cypress" />

import {
    addLastLoginCredentialsToLocalStorage,
    addCookiesAcceptedToLocalStorage,
} from "../../../utils/utils";

describe("Events Section - Delete Event", () => {
    const apiUrl = "http://localhost:9000";
    const ctx = {};

    const testEvent = {
        title: "Beach Volleyball",
        location: "Test event location",
        locationUrl: "http://venice-beach.com/",
        imageUrl: "http://venice-beach.com/image-1/",
        date: new Date().toLocaleDateString(),
    };

    const testEvents = [
        {
            date: new Date().toLocaleDateString(),
            title: "Test event 1",
            locationName: "Test event location",
            locationUrl: "http://test-event.com/location/",
            imageUrl: "http://test-event.com/image-1/",
            attendance: "Not Going",
            participationInterested: 43,
            participationGoing: 22,
        },
        {
            date: new Date().toLocaleDateString(),
            title: "Test event 2",
            locationName: "Test event location",
            locationUrl: "http://test-event.com/location/",
            imageUrl: "http://test-event.com/image-1/",
            attendance: "Not Going",
            participationInterested: 43,
            participationGoing: 22,
        },
        {
            date: new Date().toLocaleDateString(),
            title: "Test event 3",
            locationName: "Test event location",
            locationUrl: "http://test-event.com/location/",
            imageUrl: "http://test-event.com/image-1/",
            attendance: "Not Going",
            participationInterested: 43,
            participationGoing: 22,
        },
    ];

    beforeEach(() => {
        // Load the app and seed localstorage with cookiesAccepted key to true
        // and add credentials in order  to bypass login screen
        cy.visit("/").then(() => {
            addCookiesAcceptedToLocalStorage();
            addLastLoginCredentialsToLocalStorage();
        });

        // Delete all test events records
        cy.request({
            url: `${apiUrl}/api/events/delete-test-events`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.body.message).to.eq("Events deleted!");
        });

        // Check how many events are there initially
        cy.request({ url: `${apiUrl}/api/events` }).then((res) => {
            const initialAmountOfEvents = res.body.data.length;

            // If there are less than 3 initial events then create events until
            // amount of events is >= 3
            if (initialAmountOfEvents < 3) {
                // Add the as many events are needed in order to have 3 or more events
                const amountOfEventsToAdd = 3 - initialAmountOfEvents;

                // Slice the array to contain the amount of events to add
                const testEventsToAdd = testEvents.slice(
                    0,
                    amountOfEventsToAdd
                );
                testEventsToAdd.forEach((testEvent) => {
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
            }
        });

        cy.visit("/");
    });

    it("Verify an event is deleted when clicking on the event's delete button", () => {
        // Load app again to dashboard screen
        cy.visit("/");

        // Click on burger menu
        cy.get('[data-testid="burger-menu-button"]').click();

        // Click on events
        cy.get('[href="/events"]').click();

        // Check how many events are currently
        cy.get("[data-testid=single-event-component]").then((singleEvents) => {
            const currentNumberOfEvents = singleEvents.length;
            cy.log(`Current number of events: ${currentNumberOfEvents}`);
            ctx.currentNumberOfEvents = currentNumberOfEvents;
        });

        // Complete create event flow
        cy.get('[data-testid="create-event-button"]').click();

        cy.get('[data-testid="create-event-modal"]').should("be.visible");

        cy.get('[data-testid="event-title-input"]').type(testEvent.title);
        cy.get('[data-testid="event-location-input"]').type(testEvent.location);
        cy.get('[data-testid="event-location-url-input"]').type(
            testEvent.locationUrl
        );
        cy.get('[data-testid="event-image-url-input"]').type(
            testEvent.imageUrl
        );

        // No need to add date as it's automatically added, just click create event
        cy.get('[data-testid="create-event-modal-button"]').click();

        // Check success message
        cy.get('[data-testid="alert-message"]')
            .should("be.visible")
            .and("have.text", "Event successfully created!");

        // Check that there new event's data is found on event's panel
        cy.get("[data-testid=single-event-component]")
            .first()
            .should("contain.text", testEvent.title)
            .and("contain.text", testEvent.location);

        // Choose the first event element
        cy.get("[data-testid=single-event-component]")
            .first()
            .then((singleEvent) => {
                singleEvent = singleEvent[0];

                // Confirm first element has the correct title and location
                cy.get(singleEvent).should("contain.text", testEvent.title);
                cy.get(singleEvent).should("contain.text", testEvent.location);

                cy.get(singleEvent).within(() => {
                    cy.get("[data-testid=delete-button]")
                        .should("be.visible")
                        .click();
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
