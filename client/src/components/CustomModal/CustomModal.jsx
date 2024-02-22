import React from "react";
import "./CustomModal.css";
import PropTypes from "prop-types";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
} from "@mui/material";

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
    title = "",
    message = "",
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
                    className="Modal"
                    data-testid={dataTestId}
                    keepMounted
                >
                    <DialogTitle
                        className="Modal__title"
                        id={`dialog-title-${dataTestId}`}
                    >
                        {title}
                    </DialogTitle>
                    <DialogContent className="Modal__content">
                        <DialogContentText>{message}</DialogContentText>
                    </DialogContent>
                    <div className="Modal__actions">{children}</div>
                </Dialog>
            )}
        </>
    );
};

CustomModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
    dataTestId: PropTypes.string,
    children: PropTypes.node,
};

export default CustomModal;
