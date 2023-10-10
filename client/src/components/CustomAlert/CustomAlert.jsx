import { forwardRef } from "react";
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 *
 * @param {string} message to display
 * @param {string} severity level of the alert, options are: success, info, warning, error
 *
 * @param {boolean} open - boolean state use to open or close the alert
 * @param {function} setOpen - function used to change the state to open and close the alert
 *
 * @returns CustomAlert component.
 */

const CustomAlert = ({ severity, message, open, setOpen }) => {
    return (
        <Collapse in={open}>
            <Alert
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
                severity={severity}
                sx={{ mb: 2 }}
            >
                {message}
            </Alert>
        </Collapse>
    );
};

CustomAlert.propTypes = {
    severity: PropTypes.string,
    message: PropTypes.string,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
};

export default CustomAlert;
