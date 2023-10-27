import "./CreateEventModal.css";
import { useState } from "react";
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

const today = dayjs();

const CreateEventModal = ({
    themeMode,
    isOpen,
    handleClose,
    setEvents,
    setSnackbarOptions,
    setOpenSnackbar,
}) => {
    const [eventDate, setEventDate] = useState(today);
    const [eventTitle, setEventTitle] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [eventLocationUrl, setEventLocationUrl] = useState("");
    const [eventImageUrl, setEventImageUrl] = useState("");

    const handlCreateEventClicked = () => {
        const newEvent = {
            title: eventTitle,
            locationName: eventLocation,
            locationUrl: eventLocationUrl,
            imageUrl: eventImageUrl,
            attendance: "Going",
            date: eventDate,
            participationInterested: 1,
            participationGoing: 1,
        };

        // Insert new record on db
        fetch("http://localhost:9000/api/event/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEvent),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    setSnackbarOptions({
                        severity: "success",
                        message: "An event with that title already exists!",
                    });
                }
                setSnackbarOptions({
                    severity: "success",
                    message: "Event successfully created!",
                });

                // Fetch all events from db
                fetch("http://localhost:9000/api/events/")
                    .then((res) => res.json())
                    .then((res) => {
                        // And then set those events with setEvent
                        setEvents(res.data);
                    });

                setOpenSnackbar(true);
            });

        reset({
            "event-title-input": "",
            "event-location-input": "",
            "event-location-url-input": "",
            "event-image-url-input": "",
        });

        setEventDate("");
        setEventTitle("");
        setEventLocation("");
        setEventLocationUrl("");
        setEventImageUrl("");

        handleClose();
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
        // "date-input": yup
        //   .date("Not a valid date!")
        //   .required("Event date is required!"),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

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
                    <DialogTitle
                        className={`CreateEventModal__title ${themeMode}`}
                    >
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
                            error={
                                errors["event-location-input"] ? true : false
                            }
                            helperText={errors["event-location-input"]?.message}
                            onChange={(event) => {
                                setEventLocation(event.target.value);
                            }}
                            inputProps={{
                                "data-testid": "event-location-input",
                            }}
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
                            error={
                                errors["event-location-url-input"]
                                    ? true
                                    : false
                            }
                            helperText={
                                errors["event-location-url-input"]?.message
                            }
                            onChange={(event) => {
                                setEventLocationUrl(event.target.value);
                            }}
                            inputProps={{
                                "data-testid": "event-location-url-input",
                            }}
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
                            error={
                                errors["event-image-url-input"] ? true : false
                            }
                            helperText={
                                errors["event-image-url-input"]?.message
                            }
                            onChange={(event) => {
                                setEventImageUrl(event.target.value);
                            }}
                            inputProps={{
                                "data-testid": "event-image-url-input",
                            }}
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
                                    "data-testid": "event-date-input",
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
                            data-testid="create-event-modal-button"
                            className={`CreateEventModal__button ${themeMode}`}
                            variant="contained"
                            type="submit"
                            onClick={handleSubmit(handlCreateEventClicked)}
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
