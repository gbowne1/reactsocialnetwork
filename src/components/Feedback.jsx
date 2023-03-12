import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Link, useLocation } from 'react-router-dom';

const Feedback = ({themeMode}) => {

    const [isDialogOpen, setIsDialogOpen] = useState(true);

    let location = useLocation(); 

    let previousRoute = location.state || "/dashboard"; 

    const handleClose = () => {
        setIsDialogOpen(false);
    };

  return (
    <div>
      <Dialog open={isDialogOpen}>
        <DialogTitle>Feedback</DialogTitle>
        <DialogContent>
            <DialogContentText>
                This app is created and maintained by GitHub open source community. We are happy to get any feedback and encourage you to contribute if you would like. If so, make sure to read <Link to="https://github.com/gbowne1/reactsocialnetwork/blob/main/CONTRIBUTING.md">Contribution guide</Link>.
            </DialogContentText>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>
                <Link to={previousRoute}>Go back</Link>
            </Button>
            <Button>
                <Link target='_blank' to="https://github.com/gbowne1/reactsocialnetwork">Go to Github</Link>
            </Button>
        </DialogActions>
        </Dialog>
    </div>
  );
}

Feedback.propTypes = {
    themeMode: PropTypes.string,
  };
  

export default Feedback;