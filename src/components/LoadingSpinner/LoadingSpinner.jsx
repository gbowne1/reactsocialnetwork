import { CircularProgress } from "@mui/material";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div data-testid="loading-spinner" className={"LoadingSpinner"}>
      <CircularProgress size={60} />
    </div>
  );
};

export default LoadingSpinner;
