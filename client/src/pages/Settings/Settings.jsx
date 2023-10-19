import "./Settings.css";
import { useState } from "react";
import PropTypes from "prop-types";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

import Panel from "../../components/Panel/Panel";

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
                    dataTestId="settings-panel"
                >
                    <div className="Settings__tab-groups-container">
                        <div className="Settings__tab-group">
                            <h3 className="Settings__tab-group-header">
                                Notifications Settings
                            </h3>
                            <FormGroup className="Settings__tab-group-tabs">
                                <FormControlLabel
                                    control={
                                        <Switch
                                            size="small"
                                            className="Settings__switch"
                                        />
                                    }
                                    label="Email Notifications"
                                    className="Settings__switch-wrapper"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            size="small"
                                            className="Settings__switch"
                                        />
                                    }
                                    label="Push Notifications"
                                    className="Settings__switch-wrapper"
                                />
                            </FormGroup>
                        </div>

                        <hr />

                        <div className="Settings__tab-group">
                            <h3 className="Settings__tab-group-header">
                                Security
                            </h3>
                            <FormGroup className="Settings__tab-group-tabs">
                                {/* Place for Security tabs */}
                            </FormGroup>
                        </div>

                        <hr />

                        <div className="Settings__tab-group">
                            <h3 className="Settings__tab-group-header">
                                Unusual Activity Settings
                            </h3>
                            <FormGroup className="Settings__tab-group-tabs">
                                {/* Place for Unusual Activity Settings tabs */}
                            </FormGroup>
                        </div>

                        <hr />

                        <div className="Settings__tab-group">
                            <h3 className="Settings__tab-group-header">
                                Alerts Settings
                            </h3>
                            <FormGroup className="Settings__tab-group-tabs">
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
