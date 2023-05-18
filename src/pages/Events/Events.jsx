import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, MenuItem, Select, Stack } from "@mui/material";

import SingleEvent from "./SingleEvent/SingleEvent";
import CreateEventModal from "./CreateEventModal/CreateEventModal";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";
import Panel from "../../components/Panel/Panel";

import saveToLocalStorage from "../../utils/saveToLocalStorage";
import getFromLocalStorage from "../../utils/getFromLocalStorage";
import eventsData from "../../data/eventsData";
import "./Events.css";

const Events = ({ themeMode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [eventsFilterValue, setEventsFilterValue] = useState("Home");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarOptions, setSnackbarOptions] = useState({});

  const [events, setEvents] = useState(
    getFromLocalStorage("events") || eventsData
  );
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    saveToLocalStorage("events", events);
  }, [events]);

  const handleCreateEventClose = () => {
    setCreateEventModalOpen(false);
  };

  const handleCreateEventClicked = () => {
    setCreateEventModalOpen(true);
  };

  const handleEventFilterClicked = (event) => {
    const eventFilterValue = event.target.value;
    setEventsFilterValue(eventFilterValue);

    if (eventFilterValue === "Home") {
      setFilteredEvents(events);
    } else {
      const filteredEvents = events.filter((event) => {
        return event.attendance === eventFilterValue;
      });
      setFilteredEvents(filteredEvents);
    }
  };

  useEffect(() => {
    if (eventsFilterValue === "Home") {
      setFilteredEvents(events);
    } else {
      const filteredEvents = events.filter((event) => {
        return event.attendance === eventsFilterValue;
      });
      setFilteredEvents(filteredEvents);
    }
  }, [events, eventsFilterValue]);

  return (
    <>
      <CustomSnackbar
        message={snackbarOptions.message}
        vertical={"top"}
        horizontal={"center"}
        alert={true}
        severity={snackbarOptions.severity}
        open={openSnackbar}
        setOpen={setOpenSnackbar}
      />

      <CreateEventModal
        isOpen={createEventModalOpen}
        handleClose={handleCreateEventClose}
        events={events}
        setEvents={setEvents}
        themeMode={themeMode}
        setSnackbarOptions={setSnackbarOptions}
        setOpenSnackbar={setOpenSnackbar}
      />

      {isOpen && (
        <Panel
          themeMode={themeMode}
          titleHeading="Your Events"
          contentHeading="Events"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          dataTestId="events-component"
        >
          <Box className={`Events__content ${themeMode}`}>
            <Box className={`Events__button-panel`}>
              <Button
                variant="contained"
                onClick={handleCreateEventClicked}
                className={`Events__creat-event-button ${themeMode}`}
                data-testid="create-event-button"
              >
                Create new event
              </Button>

              <Select
                id="attendance-filter"
                data-testid="attendance-filter"
                className={`Events__attendance-filter ${themeMode}`}
                value={eventsFilterValue}
                onChange={handleEventFilterClicked}
              >
                <MenuItem value={"Home"}>Home</MenuItem>
                <MenuItem value={"Going"}>Going</MenuItem>
                <MenuItem value={"Interested"}>Interested</MenuItem>
                <MenuItem value={"Not Going"}>Not Going</MenuItem>
              </Select>
            </Box>

            <Stack spacing={2} className={`Events__stack ${themeMode}`}>
              {filteredEvents.map((event, i) => {
                return (
                  <SingleEvent
                    themeMode={themeMode}
                    key={i}
                    eventKey={i}
                    eventData={event}
                    events={events}
                    setEvents={setEvents}
                    setSnackbarOptions={setSnackbarOptions}
                    setOpenSnackbar={setOpenSnackbar}
                  />
                );
              })}
            </Stack>
          </Box>
        </Panel>
      )}
    </>
  );
};

Events.propTypes = {
  themeMode: PropTypes.string,
};

export default Events;
