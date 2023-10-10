import { fireEvent, screen, render } from "@testing-library/react";
import { within } from "@testing-library/react";

import Events from "../Events";

describe("Test Events component attendance filter", () => {
    it.skip("should display only 'Going' events when filtering by 'Going'", async () => {
        render(<Events />);

        // Make sure at least 1 of the initial 3 events is set to 'Going'.
        const firstSingleEvent = screen.getAllByTestId(
            "single-event-component"
        )[0];

        const singleEventAttendanceFilter =
            within(firstSingleEvent).getByTestId("attendance-select");
        expect(singleEventAttendanceFilter).toBeVisible();

        // Change attendance select to 'Going'.
        fireEvent.mouseDown(
            await within(singleEventAttendanceFilter).findByRole("button")
        );
        let listbox = within(screen.getByRole("listbox"));
        fireEvent.click(listbox.getByText(/^Going$/i));

        // Check text of attendance filter changed.
        expect(singleEventAttendanceFilter).toHaveTextContent("Going");

        // Save the data(title, location, participation, etc) of that event.
        const dateText =
            within(firstSingleEvent).getByTestId(
                "single-event-date"
            ).textContent;
        const titleText =
            within(firstSingleEvent).getByTestId(
                "single-event-title"
            ).textContent;
        const locationText = within(firstSingleEvent).getByTestId(
            "single-event-location"
        ).textContent;
        const participationText = within(firstSingleEvent).getByTestId(
            "single-event-participation"
        ).textContent;

        const eventComponentAttendanceFilter =
            screen.getByTestId("attendance-filter");

        // Check event filter initially has 'Home' option.
        expect(eventComponentAttendanceFilter).toHaveTextContent("Home");

        // Click on event filter and filter by 'Going'.
        fireEvent.mouseDown(
            await within(eventComponentAttendanceFilter).findByRole("button")
        );
        listbox = within(screen.getByRole("listbox"));
        fireEvent.click(listbox.getByText(/^Going$/i));

        // Check option is updated on event filter.
        expect(eventComponentAttendanceFilter).toHaveTextContent("Going");

        // There should only be 1 event displayed.
        const currentEventsDisplayed = screen.getAllByTestId(
            "single-event-component"
        );
        expect(currentEventsDisplayed).toHaveLength(1);
        // It should have the data of the event mentioned before.
        expect(currentEventsDisplayed[0].textContent).toContain(dateText);
        expect(currentEventsDisplayed[0].textContent).toContain(titleText);
        expect(currentEventsDisplayed[0].textContent).toContain(locationText);
        expect(currentEventsDisplayed[0].textContent).toContain(
            participationText
        );
    });

    it.skip("should display only 'Interested' events when filtering by 'Interested'", async () => {
        render(<Events />);

        // Make sure at least 1 of the initial 3 events is set to 'Interested'.
        const firstSingleEvent = screen.getAllByTestId(
            "single-event-component"
        )[0];

        const singleEventAttendanceFilter =
            within(firstSingleEvent).getByTestId("attendance-select");
        expect(singleEventAttendanceFilter).toBeVisible();

        // Change attendance select to 'Interested'.
        fireEvent.mouseDown(
            await within(singleEventAttendanceFilter).findByRole("button")
        );
        let listbox = within(screen.getByRole("listbox"));
        fireEvent.click(listbox.getByText(/^Interested$/i));

        // Check text of attendance filter changed.
        expect(singleEventAttendanceFilter).toHaveTextContent("Interested");

        // Save the data(title, location, participation, etc) of that event.
        const dateText =
            within(firstSingleEvent).getByTestId(
                "single-event-date"
            ).textContent;
        const titleText =
            within(firstSingleEvent).getByTestId(
                "single-event-title"
            ).textContent;
        const locationText = within(firstSingleEvent).getByTestId(
            "single-event-location"
        ).textContent;
        const participationText = within(firstSingleEvent).getByTestId(
            "single-event-participation"
        ).textContent;

        const eventComponentAttendanceFilter =
            screen.getByTestId("attendance-filter");

        // Check event filter initially has 'Home' option.
        expect(eventComponentAttendanceFilter).toHaveTextContent("Home");

        // Click on event filter and filter by 'Interested'.
        fireEvent.mouseDown(
            await within(eventComponentAttendanceFilter).findByRole("button")
        );
        listbox = within(screen.getByRole("listbox"));
        fireEvent.click(listbox.getByText(/^Interested$/i));

        // Check option is updated on event filter.
        expect(eventComponentAttendanceFilter).toHaveTextContent("Interested");

        // There should only be 1 event displayed.
        const currentEventsDisplayed = screen.getAllByTestId(
            "single-event-component"
        );
        expect(currentEventsDisplayed).toHaveLength(1);
        // It should have the data of the event mentioned before.
        expect(currentEventsDisplayed[0].textContent).toContain(dateText);
        expect(currentEventsDisplayed[0].textContent).toContain(titleText);
        expect(currentEventsDisplayed[0].textContent).toContain(locationText);
        expect(currentEventsDisplayed[0].textContent).toContain(
            participationText
        );
    });

    it.skip("should display only 'Not Going' events when filtering by 'Not Going'", async () => {
        render(<Events />);

        // Make sure at least 1 of the initial 3 events is set to 'Not Going'.
        const firstSingleEvent = screen.getAllByTestId(
            "single-event-component"
        )[0];

        const singleEventAttendanceFilter =
            within(firstSingleEvent).getByTestId("attendance-select");
        expect(singleEventAttendanceFilter).toBeVisible();

        // Change attendance select to 'Not Going'.
        fireEvent.mouseDown(
            await within(singleEventAttendanceFilter).findByRole("button")
        );
        let listbox = within(screen.getByRole("listbox"));
        fireEvent.click(listbox.getByText(/^Not Going$/i));

        // Check text of attendance filter changed.
        expect(singleEventAttendanceFilter).toHaveTextContent("Not Going");

        // Save the data(title, location, participation, etc) of that event.
        const dateText =
            within(firstSingleEvent).getByTestId(
                "single-event-date"
            ).textContent;
        const titleText =
            within(firstSingleEvent).getByTestId(
                "single-event-title"
            ).textContent;
        const locationText = within(firstSingleEvent).getByTestId(
            "single-event-location"
        ).textContent;
        const participationText = within(firstSingleEvent).getByTestId(
            "single-event-participation"
        ).textContent;

        const eventComponentAttendanceFilter =
            screen.getByTestId("attendance-filter");

        // Check event filter initially has 'Home' option.
        expect(eventComponentAttendanceFilter).toHaveTextContent("Home");

        // Click on event filter and filter by 'Not Going'.
        fireEvent.mouseDown(
            await within(eventComponentAttendanceFilter).findByRole("button")
        );
        listbox = within(screen.getByRole("listbox"));
        fireEvent.click(listbox.getByText(/^Not Going$/i));

        // Check option is updated on event filter.
        expect(eventComponentAttendanceFilter).toHaveTextContent("Not Going");

        // There should only be 1 event displayed.
        const currentEventsDisplayed = screen.getAllByTestId(
            "single-event-component"
        );
        expect(currentEventsDisplayed).toHaveLength(3);
        // It should have the data of the event mentioned before.
        expect(currentEventsDisplayed[0].textContent).toContain(dateText);
        expect(currentEventsDisplayed[0].textContent).toContain(titleText);
        expect(currentEventsDisplayed[0].textContent).toContain(locationText);
        expect(currentEventsDisplayed[0].textContent).toContain(
            participationText
        );
    });
});
