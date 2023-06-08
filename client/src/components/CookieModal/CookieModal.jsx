import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Checkbox,
  Modal,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import getFromLocalStorage from "../../utils/getFromLocalStorage";
import saveToLocalStorage from "../../utils/saveToLocalStorage";

const CookieModal = () => {
  // State used to ONLY show cookie modal in case cookies have not been accepted.
  const [cookiesAccepted] = useState(getFromLocalStorage("cookiesAccepted"));

  const [isOpen, setIsOpen] = useState(false);
  const [showLearnMoreLink] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const closeCookieModal = () => {
    // Save cookie state on localStorage.
    saveToLocalStorage("cookiesAccepted", true);
    setIsOpen(false);
  };

  return cookiesAccepted ? null : (
    <Modal open={isOpen} onClose={closeCookieModal} className="modal-box">
      <>
        <Card className="cookies-card">
          <CardHeader title="Our Website Uses Cookies" />
          <HighlightOffIcon
            className="closeIcon"
            data-testid="cookie-modal-close-button"
            onClick={() => {
              setIsOpen(false);
            }}
          />
          <CardContent>
            <div className="card-content">
              <p>We collect user data to provide better user experience.</p>
              {showLearnMoreLink && (
                <a href="!#" style={{ color: "black" }}>
                  {" "}
                  Learn more about how we use cookies.
                </a>
              )}
            </div>
            <hr />
            <div className="cookies-card-bottom">
              <Checkbox color="primary" />
              <div className="text">
                <p>Necessary Cookies</p>
              </div>
            </div>
            <div className="cookies-card-bottom">
              <Checkbox color="primary" />
              <div className="text">
                <p>Analytical Cookies</p>
              </div>
            </div>
          </CardContent>
          <CardActions>
            <div className="card-footer">
              <Button
                variant="contained"
                color="secondary"
                className="necessarybtn"
                onClick={closeCookieModal}
              >
                Accept Necessary
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="acceptallbtn"
                onClick={closeCookieModal}
              >
                Accept All
              </Button>
            </div>
          </CardActions>
        </Card>
      </>
    </Modal>
  );
};

export default CookieModal;
