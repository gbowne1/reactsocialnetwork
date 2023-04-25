import { act, screen, render, fireEvent } from "@testing-library/react";
import { within } from "@testing-library/dom";

import SingleEvent from "../SingleEvent";

const eventData = {
  date: new Date(),
  title: "Cinema Night!",
  locationName: "Cinema32",
  locationUrl: "#",
  imageUrl:
    "https://www.shutterstock.com/image-photo/02-august-2018bucharest-romania-people-260nw-1148998826.jpg",
  attendance: "Not Going",

  participation: {
    interested: 46,
    going: 27,
  },
};
const themeMode = "light-theme";
const mockKey = 1;
const events = [];
const mockSetEvents = jest.fn((data) => console.log(data));
const mockSetSnackbarOptions = jest.fn((data) => console.log(data));
const mockSetOpenSnackbar = jest.fn((data) => console.log(data));

const renderComponent = () => {
  act(() => {
    render(
      <SingleEvent
        themeMode={themeMode}
        key={mockKey}
        eventKey={mockKey}
        eventData={eventData}
        events={events}
        setEvents={mockSetEvents}
        setSnackbarOptions={mockSetSnackbarOptions}
        setOpenSnackbar={mockSetOpenSnackbar}
      />
    );
  });
};

describe("Test SingleEvent component functionality", () => {
  it("should have attendance filter working correctly", async () => {
    renderComponent();

    // Check initial value of attendance filter.
    let attendanceFilter = screen.getByTestId("attendance-select");
    expect(attendanceFilter).toBeVisible();
    expect(attendanceFilter).toHaveTextContent(eventData.attendance);

    // Change attendance filter.
    fireEvent.mouseDown(await within(attendanceFilter).findByRole("button"));
    let listbox = within(screen.getByRole("listbox"));
    fireEvent.click(listbox.getByText(/^Going$/i));

    // Check text of attendance filter changed.
    expect(attendanceFilter).toHaveTextContent("Going");

    // Change value of attendance filter.
    fireEvent.mouseDown(await within(attendanceFilter).findByRole("button"));
    listbox = within(screen.getByRole("listbox"));
    fireEvent.click(listbox.getByText(/^Interested$/i));

    // Check text of attendance filter changed.
    expect(attendanceFilter).toHaveTextContent("Interested");

    // Change value of attendance filter.
    fireEvent.mouseDown(await within(attendanceFilter).findByRole("button"));
    listbox = within(screen.getByRole("listbox"));
    fireEvent.click(listbox.getByText(/^Not Going$/i));

    // Check text of attendance filter changed.
    expect(attendanceFilter).toHaveTextContent("Not Going");
  });

  it.skip("should have share button working correctly", () => {});

  it("should have delete button working correctly", () => {
    renderComponent();

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);

    // Check that mock functions were called.
    // Check setEvents was called.
    expect(mockSetEvents.mock.calls).toHaveLength(1);

    // Check setSnackbarOptions was called.
    expect(mockSetSnackbarOptions.mock.calls).toHaveLength(1);

    // Check setOpenSnackbar was called.
    expect(mockSetOpenSnackbar.mock.calls).toHaveLength(1);
  });
});
