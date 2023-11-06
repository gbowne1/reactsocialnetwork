/// <reference types="cypress" />

import {
    addLastLoginCredentialsToLocalStorage,
    addCookiesAcceptedToLocalStorage,
} from "../../../utils/utils";

describe("Events Section - Add Event", () => {
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

    it("Verify an event is created when submitting valid data", () => {
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

        // Check that now amount of SingleEvent components is ctx.currentNumberOfEvents + 1
        cy.get("[data-testid=single-event-component]").then((singleEvents) => {
            const currentNumberOfEvents = singleEvents.length;
            expect(currentNumberOfEvents).to.eq(ctx.currentNumberOfEvents + 1);
        });
    });

    it("Verify error labels are displayed when leaving required inputs empty or on validation errors", () => {
        // Click on burger menu
        cy.get("[data-testid=burger-menu-button]").click();

        // Click on events
        cy.get('[href="/events"]').click();

        // Complete create event flow
        cy.get('[data-testid="create-event-button"]').click();

        cy.get('[data-testid="create-event-modal"]').should("be.visible");

        cy.get('[data-testid="create-event-modal-button"]').click();

        // R
        cy.get('[data-testid="event-date-input"]').type(
            "{del}{leftArrow}{del}{leftArrow}{del}"
        );

        cy.get("#event-title-input-helper-text").should(
            "have.text",
            "Event title is required!"
        );

        cy.get("#event-location-input-helper-text").should(
            "have.text",
            "Event location is required!"
        );
        cy.get("#event-location-url-input-helper-text").should(
            "have.text",
            "Event location url is required!"
        );

        cy.get("#event-image-url-input-helper-text").should(
            "have.text",
            "Event image url is required!"
        );

        cy.get('[data-testid="event-date-input"] > p').should(
            "have.text",
            "Invalid Date"
        );

        // Add a title with less than 6 characters
        cy.get('[data-testid="event-title-input"]')
            .type("ABCDE")
            .should("have.value", "ABCDE");

        cy.get('[data-testid="create-event-modal-button"]').click();

        cy.get("#event-title-input-helper-text").should(
            "have.text",
            "Event title must be at least 6 characters"
        );

        // Add a title with more than 6 characters
        cy.get('[data-testid="event-title-input"]')
            .clear()
            .type("Beach party")
            .should("have.value", "Beach party");

        cy.get('[data-testid="create-event-modal-button"]').click();

        cy.get("#event-title-input-helper-text").should("not.exist");

        // Add a location with less than 6 characters
        cy.get('[data-testid="event-location-input"]')
            .type("ABCDE")
            .should("have.value", "ABCDE");

        cy.get('[data-testid="create-event-modal-button"]').click();

        cy.get("#event-location-input-helper-text").should(
            "have.text",
            "Event location must be at least 6 characters"
        );

        // Add a location with more than 6 characters
        cy.get('[data-testid="event-location-input"]')
            .clear()
            .type("Test event location")
            .should("have.value", "Test event location");

        cy.get('[data-testid="create-event-modal-button"]').click();

        cy.get("#event-location-input-helper-text").should("not.exist");

        // Add an invalid location url
        cy.get('[data-testid="event-location-url-input"]')
            .type("notvalidurl")
            .should("have.value", "notvalidurl");

        cy.get('[data-testid="create-event-modal-button"]').click();

        cy.get("#event-location-url-input-helper-text").should(
            "have.text",
            "Not a valid url!"
        );

        // Add a valid location url
        cy.get('[data-testid="event-location-url-input"]')
            .clear()
            .type("http://www.beach-hotel.com")
            .should("have.value", "http://www.beach-hotel.com");

        cy.get('[data-testid="create-event-modal-button"]').click();

        cy.get("#event-location-url-input-helper-text").should("not.exist");

        // Add an invalid image url
        cy.get('[data-testid="event-image-url-input"]')
            .type("notvalidurl")
            .should("have.value", "notvalidurl");

        cy.get('[data-testid="create-event-modal-button"]').click();

        cy.get("#event-image-url-input-helper-text").should(
            "have.text",
            "Not a valid url!"
        );

        // Add a valid image url
        cy.get('[data-testid="event-image-url-input"]')
            .clear()
            .type("http://www.beach-hotel.com/image-1")
            .should("have.value", "http://www.beach-hotel.com/image-1");

        // Add a date in the past
        cy.get('[data-testid="event-date-input"]').type("12/12/1950");

        cy.get('[data-testid="event-date-input"] > p').should(
            "have.text",
            "Date cannot be in the past!"
        );

        // Add a valid date in the future
        const d = new Date();
        d.setDate(d.getDate() + 1);
        const tomorrowsDate = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
        cy.get('[data-testid="event-date-input"]').type(tomorrowsDate);

        cy.get('[data-testid="create-event-modal-button"]').click();

        cy.get("#event-image-url-input-helper-text").should("not.exist");
        cy.get("[data-testid='event-date-input'] > p").should("not.exist");
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
