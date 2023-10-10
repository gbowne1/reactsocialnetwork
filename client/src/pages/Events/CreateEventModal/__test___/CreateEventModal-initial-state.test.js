import { screen } from "@testing-library/react";
import { renderCreateEventModal } from "../../../../utils/renderComponent";

describe("Test CreateEventModal is correctly displayed", () => {
    it("should display create event modal elements", () => {
        renderCreateEventModal();

        const createEventModal = screen.getByTestId("create-event-modal");
        const titleInput = screen.getByTestId("event-title-input");
        const locationInput = screen.getByTestId("event-location-input");
        const locationUrlInput = screen.getByTestId("event-location-url-input");
        const imageUrlInput = screen.getByTestId("event-image-url-input");
        const dateInput = screen.getByLabelText("Event date");

        expect(createEventModal).toBeVisible();
        expect(titleInput).toBeVisible();
        expect(locationInput).toBeVisible();
        expect(locationUrlInput).toBeVisible();
        expect(imageUrlInput).toBeVisible();

        // Use label to find CreateEventModal date picker since Datepicker cannot
        // have IDs associated to it.
        expect(dateInput).toBeVisible();
    });
});
