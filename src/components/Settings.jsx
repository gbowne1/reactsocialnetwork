import React from 'react';
import PropTypes from 'prop-types';
import '../assets/Settings.css';

function Settings({toggle}){
  
    return (
      <div className={`Settings-container ${toggle?"light-mode":"dark-mode"}`}>
        <div className={`Settings-header ${toggle?"light-mode-header":"dark-mode-header"}`}>
          <h3 className="Settings-title">Settings</h3>
        </div>
        <h3 className="">Notifications Settings</h3>
        <hr />
        <h3 className="">Security</h3>
        <hr />
        <h3 className="">Unusual Activity Settings</h3>
        <hr />
        <h3 className="">Alerts Settings</h3>
        <hr />
      </div>
    );
  }
 
  Settings.propTypes = {
   toggle: PropTypes.bool
  };
  
export default Settings;
