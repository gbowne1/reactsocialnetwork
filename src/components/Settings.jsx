import React from 'react';
import '../assets/Settings.css';

class Settings extends React.Component {
  render() {
    return (
      <div className="Settings-container">
        <div className="Settings-header">
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
}
export default Settings;
