import { act, render } from "@testing-library/react";
import SingleEvent from "../pages/Events/SingleEvent/SingleEvent";
import CreateEventModal from "../pages/Events/CreateEventModal/CreateEventModal";

/**
 * Helper function to render the SingleEvent component and pass mock params in order to comply with DRY
 * @returns  {
 *   eventData, -> Data used for event
 *   mockSetEvents, -> Mock function
 *   mockSetSnackbarOptions, -> Mock function
 *   mockSetOpenSnackbar, -> Mock function
 * }
 */
const renderSingleEvent = () => {
    const eventData = {
        date: new Date(),
        title: "Cinema Night!",
        locationName: "Cinema32",
        locationUrl: "#",
        imageUrl:
            "https://www.shutterstock.com/image-photo/02-august-2018bucharest-romania-people-260nw-1148998826.jpg",
        attendance: "Not Going",

        participationInterested: 46,
        participationGoing: 27,
    };

    const themeMode = "light-theme";
    const mockKey = 1;
    const events = [];
    const mockSetEvents = jest.fn((data) => console.log(data));
    const mockSetSnackbarOptions = jest.fn((data) => console.log(data));
    const mockSetOpenSnackbar = jest.fn((data) => console.log(data));

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

    return {
        eventData,
        mockSetEvents,
        mockSetSnackbarOptions,
        mockSetOpenSnackbar,
    };
};

/*
 *
 * Helper function to render the CreateEventModal component and pass mock params in order to comply with DRY
 * @returns  {
    mockSetEvents, -> Mock function 
    mockSetSnackbarOptions, -> Mock function 
    mockSetOpenSnackbar, -> Mock function 
  }
 */
const renderCreateEventModal = () => {
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

    return {
        mockSetEvents,
        mockSetSnackbarOptions,
        mockSetOpenSnackbar,
    };
};

export { renderSingleEvent, renderCreateEventModal };
