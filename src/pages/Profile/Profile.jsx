import React, { useState } from 'react';
import PropTypes from "prop-types";
import CloseButton from "../../components/CloseButton/CloseButton";
import './Profile.css';

function Profile({themeMode}){
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    setIsOpen(!isOpen)
  }
 
  return (
    <>
      {isOpen && (
        <div
          className={`Profile-container ${themeMode}`}
        >
          <div
            className={`Profile-header ${themeMode}`}
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
  themeMode: PropTypes.string,
};
  

export default Profile;
