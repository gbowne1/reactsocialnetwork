import { CircularProgress } from "@mui/material";
import "./LoadingSpinner.css";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div data-testid="loading-spinner" className={"LoadingSpinner"}>
      <CircularProgress size={60} />
    </div>
  );
};

export default LoadingSpinner;
