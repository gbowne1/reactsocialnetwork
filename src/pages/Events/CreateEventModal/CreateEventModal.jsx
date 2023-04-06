import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as yup from "yup";

import isValidUrl from "../../../utils/isValidUrl";

import "./CreateEventModal.css";

const today = dayjs();

const CreateEventModal = ({
  themeMode,
  isOpen,
  handleClose,
  events,
  setEvents,
  setSnackbarOptions,
  setOpenSnackbar,
}) => {
  const [eventDate, setEventDate] = useState(today);
  const [eventTitle, setEventTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventLocationUrl, setEventLocationUrl] = useState("");
  const [eventImageUrl, setEventImageUrl] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [locationUrlError, setLocationUrlError] = useState(false);
  const [imageUrlError, setImageUrlError] = useState(false);

  const [createEventButtonDisabled, setCreateEventButtonDisabled] =
    useState(true);

  const handlCreateEventClicked = () => {
    const newEvent = {
      date: eventDate,
      title: eventTitle,
      locationName: eventLocation,
      locationUrl: eventLocationUrl,
      imageUrl: eventImageUrl,
      attendance: "Going",

      participation: {
        interested: 1,
        going: 1,
      },
    };

    validationSchema
      .validate(newEvent)
      .then((valid) => {
        if (valid) {
          console.log("Saving new event ", newEvent);
          setEvents([...events, newEvent]);

          setSnackbarOptions({
            severity: "success",
            message: "Event successfully created!",
          });

          setOpenSnackbar(true);
        }

        setEventDate("");
        setEventTitle("");
        setEventLocation("");
        setEventLocationUrl("");
        setEventImageUrl("");

        handleClose();
      })
      .catch((err) => {
        console.log(err.name); // ValidationError
        console.log(err.errors); // ['Not a proper email']
      });
  };

  const validationSchema = yup.object().shape({
    date: yup.date("Not a valid date!").required(),
    title: yup
      .string()
      .required()
      .min(6, "Event title must be at least 6 characters"),
    locationName: yup.string().required(),
    locationUrl: yup.string().required().url("Not a valid url!"),
    imageUrl: yup.string().required().url("Not a valid url!"),
  });

  const checkForTitleError = (title) => {
    return setTitleError(title.length > 5 ? false : true);
  };

  const checkForLocationError = (location) => {
    return setLocationError(location.length > 5 ? false : true);
  };

  const checkForLocationUrlError = (locationUrl) => {
    setLocationUrlError(!isValidUrl(locationUrl));
  };

  const checkForImageUrlError = (imageUrl) => {
    setImageUrlError(!isValidUrl(imageUrl));
  };

  useEffect(() => {
    setCreateEventButtonDisabled(
      eventTitle.length < 1 ||
        eventLocation.length < 1 ||
        eventLocationUrl.length < 1 ||
        eventImageUrl.length < 1 ||
        titleError ||
        locationError ||
        locationUrlError ||
        imageUrlError
    );
  }, [
    eventTitle,
    eventLocation,
    eventLocationUrl,
    eventImageUrl,
    titleError,
    locationError,
    locationUrlError,
    imageUrlError,
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        className={`CreateEventModal`}
      >
        <Box className={`CreateEventModal__container ${themeMode}`}>
          <DialogTitle className={`CreateEventModal__title ${themeMode}`}>
            Create Event
          </DialogTitle>
          <form className={`CreateEventModal__inputs ${themeMode}`}>
            <TextField
              autoFocus
              margin="dense"
              id="event-title"
              className={`CreateEventModal__textfield ${themeMode}`}
              label="Event title"
              type="text"
              fullWidth
              variant="standard"
              required
              value={eventTitle}
              onChange={(event) => {
                setEventTitle(event.target.value);
                checkForTitleError(event.target.value);
              }}
              error={titleError}
              helperText={
                "The title of the event has to be at least 6 characters"
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="event-location"
              className={`CreateEventModal__textfield ${themeMode}`}
              label="Event location"
              type="text"
              fullWidth
              variant="standard"
              required
              value={eventLocation}
              onChange={(event) => {
                setEventLocation(event.target.value);
                checkForLocationError(event.target.value);
              }}
              error={locationError}
              helperText={
                "The location of the event has to be at least 6 characters"
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="event-location-url"
              className={`CreateEventModal__textfield ${themeMode}`}
              label="Event location url"
              type="url"
              fullWidth
              variant="standard"
              required
              value={eventLocationUrl}
              onChange={(event) => {
                setEventLocationUrl(event.target.value);
                checkForLocationUrlError(event.target.value);
              }}
              error={locationUrlError}
              helperText={"The location url must be a valid url"}
            />
            <TextField
              autoFocus
              margin="dense"
              id="event-image-url"
              className={`CreateEventModal__textfield ${themeMode}`}
              label="Event image url"
              type="url"
              fullWidth
              variant="standard"
              required
              value={eventImageUrl}
              onChange={(event) => {
                setEventImageUrl(event.target.value);
                checkForImageUrlError(event.target.value);
              }}
              error={imageUrlError}
              helperText={"The image url must be a valid url"}
            />
            <DatePicker
              value={eventDate}
              onChange={(newValue) => setEventDate(newValue)}
              className={`CreateEventModal__datepicker`}
              defaultValue={today}
              disablePast
            />
          </form>

          <DialogActions>
            <Button
              className={`CreateEventModal__button ${themeMode}`}
              variant="contained"
              type="submit"
              onClick={handlCreateEventClicked}
              disabled={createEventButtonDisabled}
            >
              Create Event
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </LocalizationProvider>
  );
};

CreateEventModal.propTypes = {
  themeMode: PropTypes.string,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  events: PropTypes.array,
  setEvents: PropTypes.func,
  setSnackbarOptions: PropTypes.func,
  setOpenSnackbar: PropTypes.func,
};

export default CreateEventModal;
