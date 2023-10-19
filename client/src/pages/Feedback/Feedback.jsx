import "./Feedback.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

const Feedback = ({ themeMode }) => {
    let location = useLocation();
    let previousRoute = location.state || "/dashboard";

    return (
        <div>
            <Dialog className="Feedback" open={true}>
                <div data-testid="feedback">
                    <DialogTitle className={`Feedback__title ${themeMode}`}>
                        Feedback
                    </DialogTitle>
                    <DialogContent className={`Feedback__content ${themeMode}`}>
                        <DialogContentText
                            className={`Feedback__content-text ${themeMode}`}
                        >
                            This app is created and maintained by GitHub open
                            source community. We are happy to get any feedback
                            and encourage you to contribute if you would like.
                            If so, make sure to read{" "}
                            <Link to="https://github.com/gbowne1/reactsocialnetwork/blob/main/CONTRIBUTING.md">
                                Contribution guide
                            </Link>
                            .
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className={`Feedback__actions ${themeMode}`}>
                        <Link tabIndex={-1} to={previousRoute}>
                            <Button tabIndex={0}>Go back</Button>
                        </Link>
                        <Link
                            tabIndex={-1}
                            target="_blank"
                            to="https://github.com/gbowne1/reactsocialnetwork"
                        >
                            <Button tabIndex={0}>Go to GitHub</Button>
                        </Link>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
};

Feedback.propTypes = {
    themeMode: PropTypes.string,
};

export default Feedback;
