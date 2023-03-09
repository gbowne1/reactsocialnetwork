import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Stack } from "@mui/material";
import CloseButton from "./CloseButton";
import SingleEvent from "./SingleEvent";

import "../assets/Events.css";

const Events = ({ toggle }) => {
  const theme = toggle ? "light-mode" : "dark-mode";
  const [isOpen, setIsOpen] = useState(true);
  const [interested, setInterested] = useState({});

  const handleClose = () => {
    setIsOpen(false);
  };

  const events = [
    {
      title: "Cinema Night!",
      locationName: "Cinema32",
      locationUrl: "#",
      imageUrl:
        "https://www.shutterstock.com/image-photo/02-august-2018bucharest-romania-people-260nw-1148998826.jpg",

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
      participation: {
        interested: 106,
        going: 78,
      },
    },
  ];

  return (
    <>
      {isOpen && (
        <Box className={`Events ${theme}`}>
          <Box className={`Events-header ${theme}`}>
            <h3 className="Events-title">Your Events</h3>
            <CloseButton handleClose={handleClose} />
          </Box>
          <Box className={`Events-content ${theme}`}>
            <Stack spacing={2} className={`events-stack ${theme}`}>
              {events.map((event, i) => {
                return (
                  <SingleEvent
                    toggle={toggle}
                    key={i}
                    eventKey={i}
                    eventData={event}
                    interested={interested}
                    setInterested={setInterested}
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
  toggle: PropTypes.bool,
};

export default Events;
