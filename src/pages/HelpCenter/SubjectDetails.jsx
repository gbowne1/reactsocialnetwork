import React from "react";
import PropTypes from "prop-types";
import "./SubjectDetails.css";

const SubjectDetails = ({header, content}) => {
    return (
        <div className="Subject-details">
            <header className="Subject-details__header">{header}</header>
            <hr style={{width: "100%"}}></hr>
            <div className="Subject-details__content">{content}</div>
        </div>
    )
}

SubjectDetails.propTypes = {
    content: PropTypes.string,
    header: PropTypes.string
}

export default SubjectDetails;