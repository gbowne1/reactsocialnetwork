import React from "react";
import PropTypes from "prop-types";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";
import "../assets/SingleEvent.css";

const SingleEvent = ({
  toggle,
  eventData,
  eventKey,
  interested,
  setInterested,
}) => {
  const theme = toggle ? "light-mode" : "dark-mode";

  const interestedClickedHandler = (elementKey) => {
    setInterested({
      ...interested,
      [elementKey]: !interested[elementKey],
    });
    console.log(interested);
  };

  return (
    <div className={`event ${theme}`} key={eventKey}>
      <img className="event-image" src={eventData.imageUrl} />
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
          className={`interested-button ${theme}`}
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
  toggle: PropTypes.bool,
  eventData: PropTypes.object,
  eventKey: PropTypes.number,
  interested: PropTypes.object,
  setInterested: PropTypes.func,
};

export default SingleEvent;
