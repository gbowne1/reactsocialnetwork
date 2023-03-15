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
import "../assets/SingleEvent.css";

const placeholderImageUrl =
  "https://wiki.tripwireinteractive.com/images/4/47/Placeholder.png";

const SingleEvent = ({ themeMode, eventData, eventKey, events }) => {
  const [imageUrl, setImageUrl] = useState(eventData.imageUrl);
  const [attendance, setAttendance] = useState(eventData.attendance);

  const handleChange = (event) => {
    const attendance = event.target.value;
    eventData["attendance"] = attendance;
    setAttendance(attendance);
    saveToLocalStorage("events", events);
  };

  const checkImage = (imageUrl) => {
    var image = new Image();
    image.onload = function () {
      if (this.width > 0) {
        console.log("image exists");
        setImageUrl(imageUrl);
      }
    };
    image.onerror = function () {
      console.log("image doesn't exist");
      setImageUrl(placeholderImageUrl);
    };
    image.src = imageUrl;
  };

  useEffect(() => {
    console.log(
      `Calling checkImage! on imageUrl ${
        new URL(
          "https://www.shutterstock.com/image-photo/happy-friends-cheering-drinking-cocktails-260nw-1109615582.jpg"
        ).pathname
      }`
    );
    checkImage(eventData.imageUrl);
  }, [eventData.imageUrl]);

  useEffect(() => {
    setAttendance(eventData.attendance);
  }, [eventData.attendance]);

  return (
    <div className={`Event ${themeMode}`} key={eventKey}>
      <img className="Event__image" src={imageUrl} alt="event" />
      <div className="Event__text">
        <p>Today at 8pm</p>
        <p className="Event__title">{eventData.title}</p>
        <p className="Event__location">
          <span>at:</span> <a href="#">{eventData.locationName}</a>
        </p>
        <p>
          {`${eventData.participation.interested} interested... ${eventData.participation.going} going...`}
        </p>
      </div>
      <div className="Event__button-panel">
        <Select
          variant="standard"
          id="attendance-select"
          className={`Event__attendance-select ${themeMode}`}
          value={attendance}
          label="Attendance"
          onChange={handleChange}
        >
          <MenuItem value={"Going"}>
            <CheckCircleIcon
              className={`Event__attendance-icon ${themeMode}`}
            />
            Going
          </MenuItem>
          <MenuItem value={"Interested"}>
            <StarIcon className={`Event__attendance-icon ${themeMode}`} />
            Interested
          </MenuItem>
          <MenuItem value={"Not Going"}>
            <CancelIcon className={`Event__attendance-icon ${themeMode}`} />
            Not Going
          </MenuItem>
        </Select>

        <Button
          variant="outlined"
          className={`Event__share-button ${themeMode}`}
        >
          <ReplyIcon className="Event__share-button-icon" />
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
