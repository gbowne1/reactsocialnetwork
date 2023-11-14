/// <reference types="cypress" />

import {
    addLastLoginCredentialsToLocalStorage,
    addCookiesAcceptedToLocalStorage,
} from "../../../utils/utils";

describe("Events Section - Filter Event", () => {
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

    ctx.singleEvents = [];
    it("Verify events are filtered by 'Going', 'Interested' and 'Not Going' when using the event filter", () => {
        // Click on burger menu
        cy.get("[data-testid=burger-menu-button]").click();

        // Click on events
        cy.get('[href="/events"]').click();

        // Make sure 1st event is on 'Going' state
        cy.get('[data-testid="attendance-select"] > #attendance-select')
            .eq(0)
            .then((attendanceElement) => {
                attendanceElement = attendanceElement[0];
                cy.get(attendanceElement).click({ force: true });
                cy.get('[data-testid="attendance-going"]').click();
            })
            .should("have.text", "Going");

        // Reload page as there were issues targeting the 2nd event element without this
        cy.reload();

        // Make sure 2nd event is on 'Interested' state
        cy.get('[data-testid="attendance-select"] > #attendance-select')
            .eq(1)
            .then((attendanceElement) => {
                attendanceElement = attendanceElement[0];
                cy.get(attendanceElement).click({ force: true });
                cy.get('[data-testid="attendance-interested"]').click();
            })
            .should("have.text", "Interested");

        // Record the innerText of each event element to use for comparison later
        cy.get("[data-testid=single-event-component]").each(
            (singleEvent, index) => {
                singleEvent = singleEvent[0];
                ctx.singleEvents.push({
                    singleEventText: singleEvent.innerText,
                });
            }
        );

        // Filter events by 'Going'
        cy.get("#attendance-filter").click();
        cy.get('[data-value="Going"]').click();
        cy.get("#attendance-filter").should("have.text", "Going");

        // Get 'Going' event and compare text with recorded text
        cy.get("[data-testid=single-event-component]").then((singleEvent) => {
            singleEvent = singleEvent[0];
            expect(singleEvent.innerText).to.eq(
                ctx.singleEvents[0].singleEventText
            );
        });

        // Filter events by 'Interested'
        cy.get("#attendance-filter").click();
        cy.get('[data-value="Interested"]').click();
        cy.get("#attendance-filter").should("have.text", "Interested");

        // Get 'Interested' event and compare text with recorded text
        cy.get("[data-testid=single-event-component]").then((singleEvent) => {
            singleEvent = singleEvent[0];
            expect(singleEvent.innerText).to.eq(
                ctx.singleEvents[1].singleEventText
            );
        });

        // Filter events by 'Not Going'
        cy.get("#attendance-filter").click();
        cy.get('[data-value="Not Going"]').click();
        cy.get("#attendance-filter").should("have.text", "Not Going");

        // Get 'Not Going' event and compare text with recorded text
        cy.get("[data-testid=single-event-component]").then((singleEvent) => {
            singleEvent = singleEvent[0];
            expect(singleEvent.innerText).to.eq(
                ctx.singleEvents[2].singleEventText
            );
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
