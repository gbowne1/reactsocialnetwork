import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CloseButton = ({ handleClose, dataTestid }) => {
  return (
    <IconButton size="large" onClick={handleClose} data-testid={dataTestid}>
      <CloseIcon />
    </IconButton>
  );
};

CloseButton.propTypes = {
  handleClose: PropTypes.func,
  dataTestid: PropTypes.string,
};

export default CloseButton;
