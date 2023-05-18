import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Checkbox,
  Modal,
  Typography,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const CookieModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      className="modal-box"
    >
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
            <Typography>
              <div className="card-content">
                <p>We collect user data to provide better user experience.</p>
                <a href="!#" style={{ color: "black" }}>
                  {" "}
                  Learn more about how we use cookies.
                </a>
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
            </Typography>
          </CardContent>
          <CardActions>
            <div className="card-footer">
              <Button
                variant="contained"
                color="secondary"
                className="necessarybtn"
              >
                Accept Necessary
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="acceptallbtn"
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
