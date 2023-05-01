import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

import Panel from "../../components/Panel/Panel";
import "./Settings.css";

function Settings({ themeMode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <Panel
          themeMode={themeMode}
          titleHeading="Settings"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
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
        </Panel>
      )}
    </>
  );
}

Settings.propTypes = {
  themeMode: PropTypes.string,
};

export default Settings;
