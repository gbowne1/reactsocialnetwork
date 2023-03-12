import React from "react";
import PropTypes from "prop-types";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";
import "../assets/SingleEvent.css";

const SingleEvent = ({
  themeMode,
  eventData,
  eventKey,
  interested,
  setInterested,
}) => {
  

  const interestedClickedHandler = (elementKey) => {
    setInterested({
      ...interested,
      [elementKey]: !interested[elementKey],
    });
    console.log(interested);
  };

  return (
    <div className={`event ${themeMode}`} key={eventKey}>
      <img className="event-image" src={eventData.imageUrl} alt="event" />
      <div className="event-text">
        <p>Today at 8pm</p>
        <p className="event-title">{eventData.title}</p>
        <p className="event-location">
          <span>at:</span> <a href="#">{eventData.locationName}</a>
        </p>
        <p>
          {`${eventData.participation.interested} interested... ${eventData.participation.going} going...`}
        </p>
      </div>
      <div className="event-button-panel">
        <Button
          variant="contained"
          className={`interested-button ${themeMode}`}
          style={{
            backgroundColor: "#ffc93d"
          }}
          onClick={() => interestedClickedHandler(eventKey)}
        >
          {interested[eventKey] && (
            <StarIcon className="interested-button-icon" />
          )}
          <span className="interested-button-text">Interested</span>
        </Button>
      </div>
    </div>
  );
};

SingleEvent.propTypes = {
  themeMode: PropTypes.string,
  eventData: PropTypes.object,
  eventKey: PropTypes.number,
  interested: PropTypes.object,
  setInterested: PropTypes.func,
};

export default SingleEvent;
