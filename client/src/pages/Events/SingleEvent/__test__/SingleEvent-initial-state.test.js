import { screen } from "@testing-library/react";
import { renderSingleEvent } from "../../../../utils/renderComponent";

describe("Test SingleEvent component is correctly displayed", () => {
    it("should display single event component elements", () => {
        const { eventData } = renderSingleEvent();

        const eventDate = screen.getByTestId("single-event-date");
        const eventTitle = screen.getByTestId("single-event-title");
        const eventLocation = screen.getByTestId("single-event-location");
        const eventParticipation = screen.getByTestId(
            "single-event-participation"
        );

        const attendanceFilter = screen.getByTestId("attendance-select");
        const shareButton = screen.getByTestId("share-button");
        const deleteButton = screen.getByTestId("delete-button");

        expect(eventDate).toBeVisible();

        // Format date as is displayed on the Single Event component.
        const date = eventData.date;
        const formattedDate = `${date.getDate()}/${
            date.getMonth() + 1
        }/${date.getFullYear()}`;
        expect(eventDate).toHaveTextContent(formattedDate);

        expect(eventTitle).toBeVisible();
        expect(eventTitle).toHaveTextContent(eventData.title);

        expect(eventLocation).toBeVisible();
        expect(eventLocation).toHaveTextContent(eventData.locationName);

        expect(eventParticipation).toBeVisible();
        // Format participation as is displayed on the Single Event component.
        const formattedParticipation = `${eventData.participationInterested} interested... ${eventData.participationGoing} going...`;
        expect(eventParticipation).toHaveTextContent(formattedParticipation);

        expect(attendanceFilter).toBeVisible();
        expect(attendanceFilter).toHaveTextContent(eventData.attendance);

        expect(shareButton).toBeVisible();
        expect(deleteButton).toBeVisible();
    });
});
