import React, {  forwardRef } from "react";
import PropTypes from "prop-types";
import { Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomAlert = ({severity, message, open, setOpen}) => {


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
  setOpen: PropTypes.func
};


export default CustomAlert;
