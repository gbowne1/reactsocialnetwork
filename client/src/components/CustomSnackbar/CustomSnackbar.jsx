import React from "react";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
/**
 *
 * @param {string} message to display
 * @param {string} vertical position, options are: top, bottom
 * @param {string} horizontal position, options are: left, center, right
 *
 * @param {boolean} alert - if true displays an alert inside of the snackbar
 * @param {string} severity level of the alert, options are: success, info, warning, error
 *
 * @param {boolean} open - boolean state use to open or close the snackbar
 * @param {function} setOpen - function used to change the state to open and close the snackbar
 *
 * @returns CustomSnackbar component.
 */

const CustomSnackbar = ({
    message,
    vertical = "top",
    horizontal = "left",

    alert = false,
    severity = "info",

    open,
    setOpen,
}) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            message={message}
            key={vertical + horizontal}
            TransitionComponent={Slide}
        >
            {alert && (
                <Alert
                    id="alert-message"
                    data-testid="alert-message"
                    severity={severity}
                    sx={{ mb: 2 }}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {message}
                </Alert>
            )}
        </Snackbar>
    );
};

CustomSnackbar.propTypes = {
    message: PropTypes.string.isRequired,
    vertical: PropTypes.oneOf(["top", "bottom"]),
    horizontal: PropTypes.oneOf(["left", "center", "right"]),
    alert: PropTypes.bool,
    severity: PropTypes.oneOf(["success", "info", "warning", "error"]),
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};

CustomSnackbar.defaultProps = {
    vertical: "top",
    horizontal: "left",
    alert: false,
    severity: "info",
};

export default CustomSnackbar;
