import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import "./CustomModal.css";

const CustomModal = ({
  isOpen,
  setIsOpen,
  title,
  message,
  linkMessage,
  children,
}) => {
  return (
    <>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          className="dialog"
        >
          <DialogTitle className="dialog-title">{title}</DialogTitle>
          <DialogContent className="dialog-content">
            <DialogContentText>{message}</DialogContentText>
          </DialogContent>
          <div className="dialog-actions">{children}</div>
        </Dialog>
      )}
    </>
  );
};

CustomModal.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};

export default CustomModal;
