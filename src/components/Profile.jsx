import React, { useState } from 'react';
import PropTypes from "prop-types";
import CloseButton from "./CloseButton";
import '../assets/Profile.css';

function Profile({toggle}){
  const [isOpen, setIsOpen] = useState(true)

  const theme = toggle ? "light-mode" : "dark-mode";

  const handleClose = () => {
    setIsOpen(!isOpen)
  }
 
  return (
    <>
      {isOpen && (
        <div
          className={`Profile-container ${theme}`}
        >
          <div
            className={`Profile-header ${theme}`}
          >
            <h3 className="Userprofile-title">Userprofile</h3>
            <CloseButton handleClose={handleClose} />
          </div>
          <div className="container-fluid">
            <h2 className="">User Profile</h2>
          </div>
        </div>
      )}
    </>
  );
}

Profile.propTypes = {
  toggle: PropTypes.bool,
};
  

export default Profile;
