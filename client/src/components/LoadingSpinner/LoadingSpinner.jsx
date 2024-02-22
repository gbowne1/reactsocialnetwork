import React from "react";

import "./LoadingSpinner.css";
import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";

const LoadingSpinner = ({ visible }) => {
    return visible ? (
        <div data-testid="loading-spinner" className={"LoadingSpinner"}>
            <CircularProgress size={60} aria-label="Loading in progress" />
        </div>
    ) : null;
};

LoadingSpinner.propTypes = {
    visible: PropTypes.bool,
};

LoadingSpinner.defaultProps = {
    visible: true,
};

export default LoadingSpinner;
