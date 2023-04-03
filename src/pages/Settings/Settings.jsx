import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import CloseButton from "../../components/CloseButton/CloseButton";
import "./Settings.css";

function Settings({ themeMode }) {
  const [isOpen, setIsOpen] = useState(true);

  

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <div className={`Settings ${themeMode}`}>
          <div className={`Settings-header ${themeMode}`}>
            <h3 className="Settings-title">Settings</h3>
            <CloseButton handleClose={handleClose} />
          </div>
          <div className="Settings-tab-groups-container">
            <div className="Settings-tab-group">
              <h3 className="Settings-tab-group-header">
                Notifications Settings
              </h3>
              <FormGroup className="Settings-tab-group-tabs">
                <FormControlLabel
                  control={<Switch size="small" className="Settings-switch" />}
                  label="Email Notifications"
                  className="Settings-switch-wrapper"
                />
                <FormControlLabel
                  control={<Switch size="small" className="Settings-switch" />}
                  label="Push Notifications"
                  className="Settings-switch-wrapper"
                />
              </FormGroup>
            </div>

            <hr />

            <div className="Settings-tab-group">
              <h3 className="Settings-tab-group-header">Security</h3>
              <FormGroup className="Settings-tab-group-tabs">
                {/* Place for Security tabs */}
              </FormGroup>
            </div>

            <hr />

            <div className="Settings-tab-group">
              <h3 className="Settings-tab-group-header">
                Unusual Activity Settings
              </h3>
              <FormGroup className="Settings-tab-group-tabs">
                {/* Place for Unusual Activity Settings tabs */}
              </FormGroup>
            </div>

            <hr />

            <div className="Settings-tab-group">
              <h3 className="Settings-tab-group-header">Alerts Settings</h3>
              <FormGroup className="Settings-tab-group-tabs">
                {/* Place for Alerts Settings tabs */}
              </FormGroup>
            </div>

            <hr />
          </div>
        </div>
      )}
    </>
  );
}

Settings.propTypes = {
  themeMode: PropTypes.string,
};

export default Settings;
