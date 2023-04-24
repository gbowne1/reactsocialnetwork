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

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

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
    useState(false);

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

    // validationSchema
    //   .validate(newEvent)
    //   .then((valid) => {
    //     if (valid) {
    //       console.log("Saving new event ", newEvent);
    //       setEvents([...events, newEvent]);

    //       setSnackbarOptions({
    //         severity: "success",
    //         message: "Event successfully created!",
    //       });

    //       setOpenSnackbar(true);
    //     }

    //     setEventDate("");
    //     setEventTitle("");
    //     setEventLocation("");
    //     setEventLocationUrl("");
    //     setEventImageUrl("");

    //     handleClose();
    //   })
    //   .catch((err) => {
    //     console.log(err.name); // ValidationError
    //     console.log(err.errors); // ['Not a proper email']
    //   });
  };

  const isDateValid = (dateToValidate) => {
    if (!dateToValidate) {
      return {
        result: false,
        message: "Invalid Date",
      };
    }

    const dateToday = new Date(today.format("MM/DD/YYYY"));
    const dateToCheck = new Date(dateToValidate.format("MM/DD/YYYY"));

    if (dateToCheck == "Invalid Date") {
      return {
        result: false,
        message: "Invalid Date",
      };
    }
    console.log(`${dateToday} - ${dateToCheck}`);
    console.log(dateToday > dateToCheck);

    if (dateToday > dateToCheck) {
      return {
        result: false,
        message: "Date cannot be in the past!",
      };
    } else {
      return {
        result: true,
        message: "",
      };
    }
  };

  const validationSchema = yup.object().shape({
    "event-title-input": yup
      .string()
      .required("Event title is required!")
      .min(6, "Event title must be at least 6 characters"),
    "event-location-input": yup
      .string()
      .required("Event location is required!")
      .min(6, "Event location must be at least 6 characters"),
    "event-location-url-input": yup
      .string()
      .required("Event location url is required!")
      .url("Not a valid url!"),
    "event-image-url-input": yup
      .string()
      .required("Event image url is required!")
      .url("Not a valid url!"),
    "date-input": yup
      .date("Not a valid date!")
      .required("Event date is required!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  console.log(isDateValid(eventDate));

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

  // useEffect(() => {
  //   setCreateEventButtonDisabled(
  //     eventTitle.length < 1 ||
  //       eventLocation.length < 1 ||
  //       eventLocationUrl.length < 1 ||
  //       eventImageUrl.length < 1 ||
  //       titleError ||
  //       locationError ||
  //       locationUrlError ||
  //       imageUrlError
  //   );
  // }, [
  //   eventTitle,
  //   eventLocation,
  //   eventLocationUrl,
  //   eventImageUrl,
  //   titleError,
  //   locationError,
  //   locationUrlError,
  //   imageUrlError,
  // ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        className={`CreateEventModal`}
      >
        <Box
          id="create-event-modal"
          data-testid="create-event-modal"
          className={`CreateEventModal__container ${themeMode}`}
        >
          <DialogTitle className={`CreateEventModal__title ${themeMode}`}>
            Create Event
          </DialogTitle>
          <form className={`CreateEventModal__inputs ${themeMode}`}>
            <TextField
              autoFocus
              margin="dense"
              id="event-title-input"
              className={`CreateEventModal__textfield ${themeMode}`}
              label="Event title"
              type="text"
              fullWidth
              variant="standard"
              required
              {...register("event-title-input")}
              error={errors["event-title-input"] ? true : false}
              helperText={errors["event-title-input"]?.message}
              onChange={(event) => {
                setEventTitle(event.target.value);
                checkForTitleError(event.target.value);
              }}
              inputProps={{ "data-testid": "event-title-input" }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="event-location-input"
              className={`CreateEventModal__textfield ${themeMode}`}
              label="Event location"
              type="text"
              fullWidth
              variant="standard"
              required
              {...register("event-location-input")}
              error={errors["event-location-input"] ? true : false}
              helperText={errors["event-location-input"]?.message}
              onChange={(event) => {
                setEventLocation(event.target.value);
                checkForLocationError(event.target.value);
              }}
              inputProps={{ "data-testid": "event-location-input" }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="event-location-url-input"
              className={`CreateEventModal__textfield ${themeMode}`}
              label="Event location url"
              type="url"
              fullWidth
              variant="standard"
              required
              {...register("event-location-url-input")}
              error={errors["event-location-url-input"] ? true : false}
              helperText={errors["event-location-url-input"]?.message}
              onChange={(event) => {
                setEventLocationUrl(event.target.value);
                checkForLocationUrlError(event.target.value);
              }}
              inputProps={{ "data-testid": "event-location-url-input" }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="event-image-url-input"
              className={`CreateEventModal__textfield ${themeMode}`}
              label="Event image url"
              type="url"
              fullWidth
              variant="standard"
              required
              {...register("event-image-url-input")}
              error={errors["event-image-url-input"] ? true : false}
              helperText={errors["event-image-url-input"]?.message}
              onChange={(event) => {
                setEventImageUrl(event.target.value);
                checkForImageUrlError(event.target.value);
              }}
              inputProps={{ "data-testid": "event-image-url-input" }}
            />
            <DatePicker
              id="event-date-input"
              label="Event date"
              className={`CreateEventModal__datepicker`}
              value={eventDate}
              slotProps={{
                textField: {
                  helperText:
                    !isDateValid(eventDate).result &&
                    isDateValid(eventDate).message,
                  "data-testid": "event-date-input"
                },
              }}
              onChange={(newValue) => setEventDate(newValue)}
              inputProps={{ "data-testid": "event-date-input" }}
              defaultValue={today}
              disablePast
            />
          </form>

          <DialogActions>
            <Button
              id="create-event-button"
              data-testid="create-event-button"
              className={`CreateEventModal__button ${themeMode}`}
              variant="contained"
              type="submit"
              onClick={handleSubmit(handlCreateEventClicked)}
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
