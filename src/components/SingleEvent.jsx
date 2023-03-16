import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplyIcon from "@mui/icons-material/Reply";


import saveToLocalStorage from "../helpers/saveToLocalStorage";
import placeholderImageUrl from "../data/placeholderImageUrl";
import checkImage from "../helpers/checkImage";
import formatDate from "../helpers/formatDate";

import "../assets/SingleEvent.css";

const SingleEvent = ({ themeMode, eventData, eventKey, events }) => {
  const [imageUrl, setImageUrl] = useState(eventData.imageUrl);
  const [attendance, setAttendance] = useState(eventData.attendance);

  const handleAttendanceChange = (event) => {
    const attendance = event.target.value;
    eventData["attendance"] = attendance;
    setAttendance(attendance);
    saveToLocalStorage("events", events);
  };



  useEffect(() => {
    checkImage(eventData.imageUrl, setImageUrl, placeholderImageUrl);
  }, [eventData.imageUrl]);

  useEffect(() => {
    setAttendance(eventData.attendance);
  }, [eventData.attendance]);

  return (
    <div className={`SingleEvent ${themeMode}`} key={eventKey}>
      <img className="SingleEvent__image" src={imageUrl} alt="event" />
      <div className="SingleEvent__text">
        <p>{formatDate(eventData.date)}</p>
        <p className="SingleEvent__title">{eventData.title}</p>
        <p className="SingleEvent__location">
          <span>at:</span> <a href="#">{eventData.locationName}</a>
        </p>
        <p>
          {`${eventData.participation.interested} interested... ${eventData.participation.going} going...`}
        </p>
      </div>
      <div className="SingleEvent__button-panel">
        <Select
          variant="standard"
          id="attendance-select"
          className={`SingleEvent__attendance-select ${themeMode}`}
          value={attendance}
          label="Attendance"
          onChange={handleAttendanceChange}
        >
          <MenuItem value={"Going"}>
            <CheckCircleIcon
              className={`SingleEvent__attendance-icon ${themeMode}`}
            />
            Going
          </MenuItem>
          <MenuItem value={"Interested"}>
            <StarIcon className={`SingleEvent__attendance-icon ${themeMode}`} />
            Interested
          </MenuItem>
          <MenuItem value={"Not Going"}>
            <CancelIcon
              className={`SingleEvent__attendance-icon ${themeMode}`}
            />
            Not Going
          </MenuItem>
        </Select>

        <Button
          variant="outlined"
          className={`SingleEvent__share-button ${themeMode}`}
        >
          <ReplyIcon className="SingleEvent__share-button-icon" />
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
};

export default SingleEvent;
