import "./LoadingSpinner.css";

import { CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
    return (
        <div data-testid="loading-spinner" className={"LoadingSpinner"}>
            <CircularProgress size={60} />
        </div>
    );
};

export default LoadingSpinner;
