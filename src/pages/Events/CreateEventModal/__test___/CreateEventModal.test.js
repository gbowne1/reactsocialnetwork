import { act, fireEvent, screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
const user = userEvent.setup();

import CreateEventModal from "../CreateEventModal";

const renderComponent = () => {
  const mockIsOpen = true;
  const mockHandleClose = jest.fn((data) => console.log(data));

  const events = [];
  const mockSetEvents = jest.fn((data) => console.log(data));

  const themeMode = "light-mode";
  const mockSetSnackbarOptions = jest.fn((data) => console.log(data));
  const mockSetOpenSnackbar = jest.fn((data) => console.log(data));

  act(() => {
    render(
      <CreateEventModal
        isOpen={mockIsOpen}
        handleClose={mockHandleClose}
        events={events}
        setEvents={mockSetEvents}
        themeMode={themeMode}
        setSnackbarOptions={mockSetSnackbarOptions}
        setOpenSnackbar={mockSetOpenSnackbar}
      />
    );
  });
};

describe("Test CreateEventModal is correctly displayed", () => {
  it("should display create event modal elements", () => {
    renderComponent();

    expect(screen.getByTestId("create-event-modal")).toBeVisible();

    expect(screen.getByTestId("event-title-input")).toBeVisible();

    expect(screen.getByTestId("event-location-input")).toBeVisible();

    expect(screen.getByTestId("event-location-url-input")).toBeVisible();

    expect(screen.getByTestId("event-image-url-input")).toBeVisible();

    // Use label to find CreateEventModal date picker since Datepicker cannot
    // have IDs associated to it.
    expect(screen.getByLabelText("Event date")).toBeVisible();
  });
});

describe("Test CreateEventModal validation", () => {
  it("should display error labels when leaving required fields empty", async () => {
    renderComponent();

    fireEvent.click(screen.getByTestId("create-event-button"));
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
    renderComponent();

    const eventTitleInput = screen.getByTestId("event-title-input");

    await act(async () => {
      await user.type(eventTitleInput, "ABCDE");
      expect(eventTitleInput.value).toBe("ABCDE");
      await user.click(screen.getByTestId("create-event-button"));
    });
    const helperText = document.querySelector("#event-title-input-helper-text");
    expect(helperText).toHaveTextContent(
      "Event title must be at least 6 characters"
    );
  });

  it("should display error label when event location is less than 6 characters", async () => {
    renderComponent();

    const eventLocationInput = screen.getByTestId("event-location-input");

    await act(async () => {
      await user.type(eventLocationInput, "ABCDE");
      expect(eventLocationInput.value).toBe("ABCDE");
      await user.click(screen.getByTestId("create-event-button"));
    });
    const helperText = document.querySelector(
      "#event-location-input-helper-text"
    );
    expect(helperText).toHaveTextContent(
      "Event location must be at least 6 characters"
    );
  });

  it("should display error label when event location url is not a valid url", async () => {
    renderComponent();

    const eventLocationUrlInput = screen.getByTestId(
      "event-location-url-input"
    );

    await act(async () => {
      await user.type(eventLocationUrlInput, "notAValidUrl");
      expect(eventLocationUrlInput.value).toBe("notAValidUrl");
      await user.click(screen.getByTestId("create-event-button"));
    });
    const helperText = document.querySelector(
      "#event-location-url-input-helper-text"
    );
    expect(helperText).toHaveTextContent("Not a valid url!");
  });

  it("should display error label when event image url is not a valid url", async () => {
    renderComponent();

    const eventImageUrlInput = screen.getByTestId("event-image-url-input");

    await act(async () => {
      await user.type(eventImageUrlInput, "notAValidUrl");
      expect(eventImageUrlInput.value).toBe("notAValidUrl");
      await user.click(screen.getByTestId("create-event-button"));
    });
    const helperText = document.querySelector(
      "#event-image-url-input-helper-text"
    );
    expect(helperText).toHaveTextContent("Not a valid url!");
  });

  it("should display error label when leaving event date empty", async () => {
    renderComponent();

    const eventDateInput = screen.getByLabelText("Event date");
    fireEvent.change(eventDateInput, { target: { value: "04/24/2022" } });

    await act(async () => {
      await user.click(screen.getByTestId("create-event-button"));
    });

    const helperText = screen.getByText(/Date cannot be in the past!/i);
    expect(helperText).toBeVisible();
  });

  it("should display error label when event date in in the past", async () => {
    renderComponent();

    const eventDateInput = screen.getByLabelText("Event date");
    fireEvent.change(eventDateInput, { target: { value: "" } });

    await act(async () => {
      await user.click(screen.getByTestId("create-event-button"));
    });

    const helperText = screen.getByText(/Invalid Date/i);
    expect(helperText).toBeVisible();
  });
});
