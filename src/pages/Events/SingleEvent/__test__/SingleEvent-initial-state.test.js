import { act, screen, render } from "@testing-library/react";

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

describe("Test SingleEvent component is correctly displayed", () => {
  it("should display single event component elements", () => {
    renderComponent();
    screen.debug();

    const eventDate = screen.getByTestId("single-event-date");
    const eventTitle = screen.getByTestId("single-event-title");
    const eventLocation = screen.getByTestId("single-event-location");
    const eventParticipation = screen.getByTestId("single-event-participation");

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
    const participation = eventData.participation;
    const formattedParticipation = `${participation.interested} interested... ${participation.going} going...`;
    expect(eventParticipation).toHaveTextContent(formattedParticipation);

    expect(attendanceFilter).toBeVisible();
    expect(attendanceFilter).toHaveTextContent(eventData.attendance);

    expect(shareButton).toBeVisible();
    expect(deleteButton).toBeVisible();
  });
});
