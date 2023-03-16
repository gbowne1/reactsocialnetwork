import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, MenuItem, Select, Stack } from "@mui/material";

import CloseButton from "./CloseButton";
import SingleEvent from "./SingleEvent";
import CreateEvent from "./CreateEvent";

import saveToLocalStorage from "../helpers/saveToLocalStorage";
import getFromLocalStorage from "../helpers/getFromLocalStorage";
import "../assets/Events.css";

const eventsData = [
  {
    title: "Cinema Night!",
    locationName: "Cinema32",
    locationUrl: "#",
    imageUrl:
      "https://www.shutterstock.com/image-photo/02-august-2018bucharest-romania-people-260nw-1148998826.jpg",
    attendance: null,

    participation: {
      interested: 46,
      going: 27,
    },
  },
  {
    title: "Pub Crawl",
    locationName: "Bulldog Bar",
    locationUrl: "#",
    imageUrl:
      "https://www.shutterstock.com/image-photo/happy-friends-cheering-drinking-cocktails-260nw-1109615582.jpg",
    attendance: null,
    participation: {
      interested: 52,
      going: 38,
    },
  },
  {
    title: "Mini golf!",
    locationName: "Mini golf park",
    locationUrl: "#",
    imageUrl:
      "https://www.shutterstock.com/image-photo/group-smiling-friends-enjoying-together-260nw-1814772797.jpg",
    attendance: null,
    participation: {
      interested: 106,
      going: 78,
    },
  },
];

const Events = ({ themeMode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [createEventOpen, setCreateEventOpen] = useState(false);
  const [eventsFilterValue, setEventsFilterValue] = useState("Home");

  const [events, setEvents] = useState(
    getFromLocalStorage("events") || eventsData
  );
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    saveToLocalStorage("events", events);
  }, [events]);

  useEffect(() => {
    console.log(filteredEvents);
  }, [filteredEvents]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCreateEventClose = () => {
    setCreateEventOpen(false);
  };

  const handleCreateEventClicked = () => {
    setCreateEventOpen(true);
  };

  const handleEventFilterClicked = (event) => {
    const eventType = event.target.value;
    setEventsFilterValue(eventType);

    console.log(eventType);
    if (eventType === "Home") {
      setFilteredEvents(events);
    } else {
      const filteredEvents = events.filter((event) => {
        return event.attendance === eventType;
      });
      setFilteredEvents(filteredEvents);
    }
  };

  return (
    <>
      <CreateEvent
        createEventOpen={createEventOpen}
        handleCreateEventClose={handleCreateEventClose}
        events={events}
        setEvents={setEvents}
      />

      {isOpen && (
        <Box className={`Events ${themeMode}`}>
          <Box className={`Events__header ${themeMode}`}>
            <h3 className="Events__title">Your Events</h3>
            <CloseButton handleClose={handleClose} />
          </Box>
          <Box className={`Events__content ${themeMode}`}>
            <Box className={`Events__button-panel`}>
              <Button variant="contained" onClick={handleCreateEventClicked}>
                Create new event
              </Button>
              <Select
                variant="outlined"
                id="attendance-select"
                label="Attendance"
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
                  />
                );
              })}
            </Stack>
          </Box>
        </Box>
      )}
    </>
  );
};

Events.propTypes = {
  themeMode: PropTypes.string,
};

export default Events;
