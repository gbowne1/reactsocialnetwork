import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
const user = userEvent.setup();
import { renderCreateEventModal } from "../../../../utils/renderComponent";

describe("Test CreateEventModal flow", () => {
  it("should fill out CreateEventModal succesfully and reset form after submit", async () => {
    const { mockSetEvents, mockSetSnackbarOptions, mockSetOpenSnackbar } =
      renderCreateEventModal();

    const newEvent = {
      title: "Beach Volleyball",
      location: "Venice Beach",
      locationUrl: "http://venice-beach.com/",
      imageUrl: "http://venice-beach.com/image-1/",
      date: "04/24/2025",
    };

    // Check modal is visible.
    const modal = screen.getByTestId("create-event-modal");
    expect(modal).toBeVisible();

    const eventTitleInput = screen.getByTestId("event-title-input");
    const eventLocationInput = screen.getByTestId("event-location-input");
    const eventLocationUrlInput = screen.getByTestId(
      "event-location-url-input"
    );
    const eventImageUrlInput = screen.getByTestId("event-image-url-input");
    const eventDateInput = screen.getByLabelText("Event date");

    await act(async () => {
      await user.type(eventTitleInput, newEvent["title"]);
      await user.type(eventLocationInput, newEvent["location"]);
      await user.type(eventLocationUrlInput, newEvent["locationUrl"]);
      await user.type(eventImageUrlInput, newEvent["imageUrl"]);
      await user.type(eventDateInput, newEvent["date"]);

      await user.click(screen.getByTestId("create-event-button"));
    });

    // Check that mock functions were called.
    // Check setEvents was called.
    expect(mockSetEvents.mock.calls).toHaveLength(1);

    // Check setSnackbarOptions was called.
    expect(mockSetSnackbarOptions.mock.calls).toHaveLength(1);

    // Check setOpenSnackbar was called.
    expect(mockSetOpenSnackbar.mock.calls).toHaveLength(1);

    expect(eventTitleInput).toHaveValue("");
    expect(eventLocationInput).toHaveValue("");
    expect(eventLocationUrlInput).toHaveValue("");
    expect(eventImageUrlInput).toHaveValue("");
    expect(eventDateInput).toHaveValue("MM/DD/YYYY");
  });
});
