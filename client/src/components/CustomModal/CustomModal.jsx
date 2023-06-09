import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import "./CustomModal.css";

/**
 *
 * @param {boolean} isOpen - boolean state use to open or close the component
 * @param {function} setIsOpen - function used to change the state to open and close the component
 *
 * @param {string} title - the heading text for the modal.
 * @param {string} message - the message text for the modal.
 *
 * @param {string} dataTestId - a data testid attribute to pass on to the main element
 *  (MUI dialog component) in order to indentify it for tests.
 *
 * @param {array} children - children elements to add inside the component.
 * @returns CustomModal component.
 */

const CustomModal = ({
  isOpen,
  setIsOpen,
  title,
  message,
  dataTestId,
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
          data-testid={dataTestId}
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
