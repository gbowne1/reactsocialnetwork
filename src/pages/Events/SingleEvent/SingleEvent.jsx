import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";

// import saveToLocalStorage from "../../../utils/saveToLocalStorage";
import placeholderImageUrl from "../../../data/placeholderImageUrl";
import checkImage from "../../../utils/checkImage";
import formatDate from "../../../utils/formatDate";

import "./SingleEvent.css";

const SingleEvent = ({
  themeMode,
  eventData,
  eventKey,
  // events,
  setEvents,
  setSnackbarOptions,
  setOpenSnackbar,
}) => {
  const [imageUrl, setImageUrl] = useState(eventData.imageUrl);
  const [attendance, setAttendance] = useState(eventData.attendance);

  const handleAttendanceChange = (event) => {
    eventData["attendance"] = event.target.value;
    setAttendance(event.target.value);
    // saveToLocalStorage("events", events);

    console.warn("On handleAttendanceChange");
    console.log("Current eventData", eventData);

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
        console.log(res.data);
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
          <p data-testid="single-event-date">{formatDate(eventData.date)}</p>
          <p data-testid="single-event-title" className="SingleEvent__title">
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
          <p data-testid="single-event-participation">
            {`${eventData.participationInterested} interested... ${eventData.participationGoing} going...`}
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
        >
          <MenuItem value={"Going"} data-testid="attendance-going">
            <CheckCircleIcon
              className={`SingleEvent__attendance-icon ${themeMode}`}
            />
            Going
          </MenuItem>
          <MenuItem value={"Interested"} data-testid="attendance-interested">
            <StarIcon className={`SingleEvent__attendance-icon ${themeMode}`} />
            Interested
          </MenuItem>
          <MenuItem value={"Not Going"} data-testid="attendance-not-going">
            <CancelIcon
              className={`SingleEvent__attendance-icon ${themeMode}`}
            />
            Not Going
          </MenuItem>
        </Select>

        <Button
          variant="outlined"
          id="share-button"
          data-testid="share-button"
          className={`SingleEvent__share-button ${themeMode}`}
        >
          <ReplyIcon className="SingleEvent__share-button-icon" />
        </Button>
        <Button
          variant="outlined"
          id="delete-button"
          data-testid="delete-button"
          className={`SingleEvent__delete-button ${themeMode}`}
          onClick={handleDeleteButtonClicked}
        >
          <DeleteIcon className="SingleEvent__delete-button-icon" />
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
