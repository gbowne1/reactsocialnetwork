import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CloseButton = ({ handleClose, dataTestid, className }) => {
    return (
        <IconButton
            size="large"
            onClick={handleClose}
            data-testid={dataTestid}
            className={className}
        >
            <CloseIcon />
        </IconButton>
    );
};

CloseButton.propTypes = {
    handleClose: PropTypes.func,
    dataTestid: PropTypes.string,
    className: PropTypes.string,
};

export default CloseButton;
