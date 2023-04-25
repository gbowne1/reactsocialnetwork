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
