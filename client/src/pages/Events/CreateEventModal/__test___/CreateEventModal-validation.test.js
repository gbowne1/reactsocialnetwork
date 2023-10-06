import { act, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderCreateEventModal } from "../../../../utils/renderComponent";
const user = userEvent.setup();

describe("Test CreateEventModal validation", () => {
    it("should display error labels when leaving required fields empty", async () => {
        renderCreateEventModal();

        const createEventButton = screen.getByTestId(
            "create-event-modal-button"
        );
        fireEvent.click(createEventButton);

        const eventTitleHelperText = await screen.findByText(
            "Event title is required!"
        );
        const eventLocationHelperText = await screen.findByText(
            "Event location is required!"
        );
        const eventLocationUrlHelperText = await screen.findByText(
            "Event location url is required!"
        );
        const eventImageUrlHelperText = await screen.findByText(
            "Event image url is required!"
        );

        expect(eventTitleHelperText).toBeVisible();
        expect(eventLocationHelperText).toBeVisible();
        expect(eventLocationUrlHelperText).toBeVisible();
        expect(eventImageUrlHelperText).toBeVisible();
    });

    it("should display error label when event title is less than 6 characters", async () => {
        renderCreateEventModal();

        const eventTitleInput = screen.getByTestId("event-title-input");

        await act(async () => {
            await user.type(eventTitleInput, "ABCDE");
            expect(eventTitleInput.value).toBe("ABCDE");

            const createEventButton = screen.getByTestId(
                "create-event-modal-button"
            );
            await user.click(createEventButton);
        });
        const helperText = document.querySelector(
            "#event-title-input-helper-text"
        );
        expect(helperText).toHaveTextContent(
            "Event title must be at least 6 characters"
        );
    });

    it("should display error label when event location is less than 6 characters", async () => {
        renderCreateEventModal();

        const eventLocationInput = screen.getByTestId("event-location-input");

        await act(async () => {
            await user.type(eventLocationInput, "ABCDE");
            expect(eventLocationInput.value).toBe("ABCDE");

            const createEventButton = screen.getByTestId(
                "create-event-modal-button"
            );
            await user.click(createEventButton);
        });
        const helperText = document.querySelector(
            "#event-location-input-helper-text"
        );
        expect(helperText).toHaveTextContent(
            "Event location must be at least 6 characters"
        );
    });

    it("should display error label when event location url is not a valid url", async () => {
        renderCreateEventModal();

        const eventLocationUrlInput = screen.getByTestId(
            "event-location-url-input"
        );

        await act(async () => {
            await user.type(eventLocationUrlInput, "notAValidUrl");
            expect(eventLocationUrlInput.value).toBe("notAValidUrl");

            const createEventButton = screen.getByTestId(
                "create-event-modal-button"
            );
            await user.click(createEventButton);
        });
        const helperText = document.querySelector(
            "#event-location-url-input-helper-text"
        );
        expect(helperText).toHaveTextContent("Not a valid url!");
    });

    it("should display error label when event image url is not a valid url", async () => {
        renderCreateEventModal();

        const eventImageUrlInput = screen.getByTestId("event-image-url-input");

        await act(async () => {
            await user.type(eventImageUrlInput, "notAValidUrl");
            expect(eventImageUrlInput.value).toBe("notAValidUrl");

            const createEventButton = screen.getByTestId(
                "create-event-modal-button"
            );
            await user.click(createEventButton);
        });
        const helperText = document.querySelector(
            "#event-image-url-input-helper-text"
        );
        expect(helperText).toHaveTextContent("Not a valid url!");
    });

    it("should display error label when leaving event date empty", async () => {
        renderCreateEventModal();

        const eventDateInput = screen.getByLabelText("Event date");
        fireEvent.change(eventDateInput, { target: { value: "04/24/2022" } });

        await act(async () => {
            const createEventButton = screen.getByTestId(
                "create-event-modal-button"
            );
            await user.click(createEventButton);
        });

        const helperText = screen.getByText(/Date cannot be in the past!/i);
        expect(helperText).toBeVisible();
    });

    it("should display error label when event date in in the past", async () => {
        renderCreateEventModal();

        const eventDateInput = screen.getByLabelText("Event date");
        fireEvent.change(eventDateInput, { target: { value: "" } });

        await act(async () => {
            const createEventButton = screen.getByTestId(
                "create-event-modal-button"
            );
            await user.click(createEventButton);
        });

        const helperText = screen.getByText(/Invalid Date/i);
        expect(helperText).toBeVisible();
    });
});
