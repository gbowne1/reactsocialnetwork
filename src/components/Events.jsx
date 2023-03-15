import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

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

  const [yourEventsOpen, setYourEventsOpen] = useState(false);
  const [createEventOpen, setCreateEventOpen] = useState(false);

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

  const handleYourEventsClicked = () => {
    setYourEventsOpen(!yourEventsOpen);
  };

  const handleCreateEventClicked = () => {
    setCreateEventOpen(true);
  };

  const handleEventFilterClicked = (eventType) => {
    if (eventType === "Home") {
      setFilteredEvents(events);
    } else {
      const filteredEvents = events.filter((event) => {
        return event.attendance === eventType;
      });
      setFilteredEvents(filteredEvents);
    }
  };

  const eventTypes = ["Home", "Going", "Interested", "Not Going"];

  return (
    <>
      <CreateEvent
        createEventOpen={createEventOpen}
        handleCreateEventClose={handleCreateEventClose}
        events={events}
        setEvents={setEvents}
      />

      <Drawer variant="permanent">
        <Toolbar className={`Events__drawer`} disableGutters={true}>
          <Typography
            variant="h4"
            className={`Events__drawer-heading`}
            align="left"
            gutterBottom
          >
            Events
          </Typography>
        </Toolbar>
        <Divider />
        <Stack spacing={2} className={`Events__drawer-stack`}>
          <Button variant="outlined" onClick={handleYourEventsClicked}>
            Your Events
          </Button>
          {yourEventsOpen && (
            <Stack spacing={2} sx={{ padding: "10px" }}>
              {eventTypes.map((eventType) => {
                return (
                  <Button
                    variant="text"
                    key={eventType}
                    onClick={() => handleEventFilterClicked(eventType)}
                  >
                    {eventType}
                  </Button>
                );
              })}
            </Stack>
          )}
          <Button variant="outlined" onClick={handleCreateEventClicked}>
            Create new event
          </Button>
        </Stack>
      </Drawer>

      {isOpen && (
        <Box className={`Events ${themeMode}`}>
          <Box className={`Events__header ${themeMode}`}>
            <h3 className="Events__title">Your Events</h3>
            <CloseButton handleClose={handleClose} />
          </Box>
          <Box className={`Events__content ${themeMode}`}>
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
