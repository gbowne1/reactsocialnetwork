import { screen, render } from "@testing-library/react";
import { within } from "@testing-library/react";

import Events from "../Events";

// Format date as is displayed on the Single Event component.
const date = new Date();
const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
}/${date.getFullYear()}`;

describe("Test Events component is correctly displayed", () => {
    it.skip("should display events component elements", () => {
        render(<Events />);

        const eventsComponent = screen.getByTestId("events-component");
        const createEventButton = screen.getByTestId("create-event-button");

        expect(eventsComponent).toBeVisible();
        expect(createEventButton).toBeVisible();

        const singleEventComponents = screen.getAllByTestId(
            "single-event-component"
        );
        singleEventComponents.forEach((component) => {
            expect(component).toBeVisible();
        });
    });

    it.skip("should display correct data for first single event", () => {
        render(<Events />);

        const firstEventData = {
            date: formattedDate,
            location: "at: Cinema32",
            title: "Cinema Night!",
            participation: "46 interested... 27 going...",
        };

        const firstSingleEvent = screen.getAllByTestId(
            "single-event-component"
        )[0];

        const dateText =
            within(firstSingleEvent).getByTestId("single-event-date");
        expect(dateText).toHaveTextContent(firstEventData["date"]);

        const locationText = within(firstSingleEvent).getByTestId(
            "single-event-location"
        );
        expect(locationText).toHaveTextContent(firstEventData["location"]);

        const titleText =
            within(firstSingleEvent).getByTestId("single-event-title");
        expect(titleText).toHaveTextContent(firstEventData["title"]);

        const participationText = within(firstSingleEvent).getByTestId(
            "single-event-participation"
        );
        expect(participationText).toHaveTextContent(
            firstEventData["participation"]
        );
    });

    it.skip("should display correct data for second single event", () => {
        render(<Events />);

        const secondEventData = {
            date: formattedDate,
            location: "at: Bulldog Bar",
            title: "Pub Crawl",
            participation: "52 interested... 38 going...",
        };

        const firstSingleEvent = screen.getAllByTestId(
            "single-event-component"
        )[1];

        const dateText =
            within(firstSingleEvent).getByTestId("single-event-date");
        expect(dateText).toHaveTextContent(secondEventData["date"]);

        const locationText = within(firstSingleEvent).getByTestId(
            "single-event-location"
        );
        expect(locationText).toHaveTextContent(secondEventData["location"]);

        const titleText =
            within(firstSingleEvent).getByTestId("single-event-title");
        expect(titleText).toHaveTextContent(secondEventData["title"]);

        const participationText = within(firstSingleEvent).getByTestId(
            "single-event-participation"
        );
        expect(participationText).toHaveTextContent(
            secondEventData["participation"]
        );
    });

    it.skip("should display correct data for third single event", () => {
        render(<Events />);

        const thirdEventData = {
            date: formattedDate,
            location: "at: Mini golf park",
            title: "Mini golf!",
            participation: "106 interested... 78 going...",
        };

        const firstSingleEvent = screen.getAllByTestId(
            "single-event-component"
        )[2];

        const dateText =
            within(firstSingleEvent).getByTestId("single-event-date");
        expect(dateText).toHaveTextContent(thirdEventData["date"]);

        const locationText = within(firstSingleEvent).getByTestId(
            "single-event-location"
        );
        expect(locationText).toHaveTextContent(thirdEventData["location"]);

        const titleText =
            within(firstSingleEvent).getByTestId("single-event-title");
        expect(titleText).toHaveTextContent(thirdEventData["title"]);

        const participationText = within(firstSingleEvent).getByTestId(
            "single-event-participation"
        );
        expect(participationText).toHaveTextContent(
            thirdEventData["participation"]
        );
    });
});
