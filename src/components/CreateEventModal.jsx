import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Stack, TextField } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "../assets/CreateEventModal.css";

const CreateEventModal = ({ isOpen, handleClose, events, setEvents }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventLocationUrl, setEventLocationUrl] = useState("");
  const [eventImageUrl, setEventImageUrl] = useState("");

  const [createEventButtonEnabled, setCreateEventButtonEnabled] =
    useState(false);

  const handlCreateEventClicked = () => {
    const newEvent = {
      title: eventTitle,
      locationName: eventLocation,
      locationUrl: "#",
      imageUrl: eventImageUrl,
      attendance: "Going",

      participation: {
        interested: 1,
        going: 1,
      },
    };

    setEvents([...events, newEvent]);
    handleClose();
  };

  useEffect(() => {
    setCreateEventButtonEnabled(
      eventTitle.length > 0 &&
        eventLocation.length > 0 &&
        eventLocationUrl.length > 0 &&
        eventImageUrl.length > 0
    );
  }, [eventTitle, eventLocation, eventImageUrl]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        className={`CreateEventModal`}
      >
        <DialogTitle className={`CreateEventModal__title`}>
          Create Event
        </DialogTitle>
        <DialogContent className={`CreateEventModal__content`}>
          Fill in this form to create a new event.
        </DialogContent>
        <Stack spacing={2} className={`CreateEventModal__inputs`}>
          <TextField
            autoFocus
            margin="dense"
            id="event-name"
            label="Event name"
            type="text"
            fullWidth
            variant="standard"
            value={eventTitle}
            onChange={(event) => setEventTitle(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="event-location"
            label="Event location"
            type="text"
            fullWidth
            variant="standard"
            value={eventLocation}
            onChange={(event) => setEventLocation(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="event-location-url"
            label="Event location url"
            type="url"
            fullWidth
            variant="standard"
            value={eventLocationUrl}
            onChange={(event) => setEventLocationUrl(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="event-image-url"
            label="Event image url"
            type="url"
            fullWidth
            variant="standard"
            value={eventImageUrl}
            onChange={(event) => setEventImageUrl(event.target.value)}
          />
          <DatePicker />
        </Stack>
        <DialogActions>
          <Button
            className={`CreateEventModal__button`}
            variant="contained"
            onClick={handlCreateEventClicked}
            disabled={!createEventButtonEnabled}
          >
            Create Event
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

CreateEventModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  events: PropTypes.array,
  setEvents: PropTypes.func,
};

export default CreateEventModal;
