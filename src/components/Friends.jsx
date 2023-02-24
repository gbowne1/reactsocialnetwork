import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import '../assets/Friends.css';
import { VscChromeClose } from "react-icons/vsc";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './Home';
// import Settings from './Settings';
// import Admin from './Admin';
// import Login from './Login';

function Friends({toggle}) {
  const [isOpen, setIsOpen] = useState(true)

  function handleClose() {
    setIsOpen(false);
  }
  
    return (
      <>      
      { isOpen && (
      <div
        className={`Section-container  ${toggle ? "light-mode" : "dark-mode"}`}
      >
        <div
          className={`Friends-header  ${
            toggle ? "light-mode-header" : "dark-mode-header"
          }`}
        >
          {" "}
          <h3 className="Friends-title">Friends</h3>
          <VscChromeClose className="icon" onClick={handleClose} />
        </div>
        <h4>Here are your Friends!</h4>
        <input
          dir="ltr"
          placeholder="Search"
          aria-invalid="false"
          aria-label="Label for text input"
          className="search"
          type="text"
          value="Search"
        ></input>
        <br />
        <div>
          <Container maxWidth="lg">
            <Card variant="outlined" sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  Friends
                </Typography>
              </CardContent>
            </Card>
          </Container>
          <span className="" dir="auto">
            <span className="">Friend Requests</span>
          </span>
        </div>
      </div>
        )}
        </>
        );
  
}
Friends.propTypes = {
  toggle: PropTypes.bool
 };

export default Friends;