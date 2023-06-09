import { useState, useEffect } from "react";

import { Button, Checkbox } from "@mui/material";
import CustomModal from "../../components/CustomModal/CustomModal";
import CloseButton from "../CloseButton/CloseButton";

import getFromLocalStorage from "../../utils/getFromLocalStorage";
import saveToLocalStorage from "../../utils/saveToLocalStorage";

import "./CookieModal.css";

const CookieModal = () => {
  // State used to ONLY show cookie modal in case cookies have not been accepted.
  const [cookiesAccepted] = useState(getFromLocalStorage("cookiesAccepted"));

  const [isOpen, setIsOpen] = useState(false);
  // const [showLearnMoreLink] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const closeCookieModal = () => {
    // Save cookie state on localStorage.
    saveToLocalStorage("cookiesAccepted", true);
    handleClose(false);
  };

  return cookiesAccepted ? null : (
      <CustomModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Our Website Uses Cookies"
        message="We collect user data to provide better user experience. Learn more about how we use cookies."
        dataTestId="cookie-modal"
      >
        <hr />
        <div className="checkbox-container">
          <div className="checkbox">
            <Checkbox color="primary" />
            <div className="text">
              <p>Necessary Cookies</p>
            </div>
          </div>
          <div className="checkbox">
            <Checkbox color="primary" />
            <div className="text">
              <p>Analytical Cookies</p>
            </div>
          </div>
        </div>

        <div className="button-container">
          <Button
            className="button"
            onClick={closeCookieModal}
            variant="contained"
            color="secondary"
            data-testid="cookie-modal-accept-necessary-button"
          >
            Accept Necessary
          </Button>
          <Button
            className="button"
            onClick={closeCookieModal}
            variant="contained"
            autoFocus
            data-testid="cookie-modal-accept-all-button"
          >
            Accept All
          </Button>
        </div>
      </CustomModal>
  );
};

export default CookieModal;
