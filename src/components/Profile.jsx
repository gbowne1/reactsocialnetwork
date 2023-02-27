import React, { useState } from 'react';
import '../assets/Profile.css';
import PropTypes from "prop-types";
import { VscChromeClose } from "react-icons/vsc";

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
            <VscChromeClose className="icon" onClick={handleClose} />
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
