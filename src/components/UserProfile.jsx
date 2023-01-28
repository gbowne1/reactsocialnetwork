import React from 'react';
import '../assets/UserProfile.css';
import PropTypes from 'prop-types';

function UserProfile({toggle}){
    return (
      <div className={`Section-container ${toggle?"light-mode":"dark-mode"}`}>
        <div className={`Userprofile-header ${toggle?"light-mode-header":"dark-mode-header"}`}>
          <h3 className="Userprofile-title">Userprofile</h3>
        </div>
      </div>
    );
  
}
UserProfile.propTypes = {
  toggle: PropTypes.bool
 };

export default UserProfile;
