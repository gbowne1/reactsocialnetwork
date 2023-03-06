import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import CloseButton from "./CloseButton";
import "../assets/Settings.css";

function Settings({ toggle }) {
  const [isOpen, setIsOpen] = useState(true);

  const theme = toggle ? "light-mode" : "dark-mode";

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <div className={`Settings ${theme}`}>
          <div className={`Settings-header ${theme}`}>
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
  toggle: PropTypes.bool,
};

export default Settings;
