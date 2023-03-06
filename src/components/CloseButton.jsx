import React from 'react'
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CloseButton = ({handleClose}) => {
  return (
    <IconButton size="large" onClick={handleClose}>
    <CloseIcon />
  </IconButton>
  )
}

CloseButton.propTypes = {
  handleClose: PropTypes.func,
};

export default CloseButton