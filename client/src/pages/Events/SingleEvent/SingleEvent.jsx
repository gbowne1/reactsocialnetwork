import "./SingleEvent.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import placeholderImageUrl from "../../../data/placeholderImageUrl";
import checkImage from "../../../utils/checkImage";
import formatDate from "../../../utils/formatDate";

const SingleEvent = ({
    themeMode,
    eventData,
    eventKey,
    setEvents,
    setSnackbarOptions,
    setOpenSnackbar,
}) => {
    const [imageUrl, setImageUrl] = useState(eventData.imageUrl);
    const [attendance, setAttendance] = useState(eventData.attendance);

    const handleAttendanceChange = (event) => {
        eventData["attendance"] = event.target.value;
        setAttendance(event.target.value);

        // Update event using updateEvent route.
        fetch(`http://localhost:9000/api/event/${eventData.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(eventData),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            });

        // Receive new eventData in callback and replace eventData with
        // updated eventData.
    };

    const handleDeleteButtonClicked = () => {
        // Use eventData.id to delete event
        fetch(`http://localhost:9000/api/event/${eventData.id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((res) => console.log(res));

        // Fetch all events again
        fetch(`http://localhost:9000/api/events/`)
            .then((res) => res.json())
            .then((res) => {
                // And set them using setEvent
                setEvents(res.data);
            });

        setSnackbarOptions({
            severity: "success",
            message: "Event successfully deleted!",
        });

        setOpenSnackbar(true);
    };

    useEffect(() => {
        checkImage(eventData.imageUrl, setImageUrl, placeholderImageUrl);
    }, [eventData.imageUrl]);

    useEffect(() => {
        setAttendance(eventData.attendance);
    }, [eventData.attendance]);

    return (
        <div
            data-testid="single-event-component"
            className={`SingleEvent ${themeMode}`}
            key={eventKey}
        >
            <div className={`SingleEvent__info-panel`}>
                <img
                    id="single-event-image"
                    data-testid="single-event-image"
                    className="SingleEvent__image"
                    src={imageUrl}
                    alt="event"
                />
                <div className="SingleEvent__text">
                    <p
                        className="SingleEvent__date"
                        data-testid="single-event-date"
                    >
                        Don't miss it on: {formatDate(eventData.date)}
                    </p>
                    <p
                        data-testid="single-event-title"
                        className="SingleEvent__title"
                    >
                        {eventData.title}
                    </p>
                    <p
                        data-testid="single-event-location"
                        className="SingleEvent__location"
                    >
                        <span>at:</span>{" "}
                        <a href={`https://example.com/events/${eventData.id}`}>
                            {eventData.locationName}
                        </a>
                    </p>
                    <p
                        data-testid="single-event-participation"
                        className="SingleEvent_participation"
                    >
                        {`${eventData.participationInterested} people are interested...`}{" "}
                        <br />
                        {` ${eventData.participationGoing} people are going...`}
                    </p>
                </div>
            </div>

            <div className="SingleEvent__button-panel">
                <Select
                    variant="standard"
                    id="attendance-select"
                    data-testid="attendance-select"
                    className={`SingleEvent__attendance-select ${themeMode}`}
                    value={attendance}
                    label="Attendance"
                    onChange={handleAttendanceChange}
                    disableUnderline
                >
                    <MenuItem
                        value={"Going"}
                        data-testid="attendance-going"
                        className="MenuItem"
                    >
                        <span>Going</span>
                    </MenuItem>
                    <MenuItem
                        value={"Interested"}
                        data-testid="attendance-interested"
                    >
                        <span>Interested</span>
                    </MenuItem>
                    <MenuItem
                        value={"Not Going"}
                        data-testid="attendance-not-going"
                    >
                        <span>Not Going</span>
                    </MenuItem>
                </Select>

                <Button
                    variant="outlined"
                    id="share-button"
                    data-testid="share-button"
                    className={`SingleEvent__share-button ${themeMode}`}
                >
                    Share
                </Button>
                <Button
                    variant="outlined"
                    id="delete-button"
                    data-testid="delete-button"
                    className={`SingleEvent__delete-button ${themeMode}`}
                    onClick={handleDeleteButtonClicked}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

SingleEvent.propTypes = {
    themeMode: PropTypes.string,
    eventData: PropTypes.object,
    eventKey: PropTypes.number,
    events: PropTypes.array,
    setEvents: PropTypes.func,
    setSnackbarOptions: PropTypes.func,
    setOpenSnackbar: PropTypes.func,
};

export default SingleEvent;
