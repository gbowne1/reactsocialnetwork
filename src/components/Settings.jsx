import React from 'react';
import PropTypes from 'prop-types';
import '../assets/Settings.css';

function Settings({toggle}){

  const theme = toggle ? "light-mode" : "dark-mode";
  
    return (
      <div className={`Section-container ${theme}`}>
        <div className={`Settings-header ${theme + "-header"}`}>
          <h3 className="Settings-title">Settings</h3>
        </div>
        <div className='Settings-tab-groups-container'>

          <div className='Settings-tab-group'>
            <h3 className='Settings-tab-group-header'>Notifications Settings</h3>
            <div className='Settings-tab-group-tabs'>
              <div>
                <input type="checkbox" id='email-notifications' className='Notifications-tab'/>
                <label htmlFor='email-notifications'>Email Notifications</label>
              </div>
              <div>
                <input type="checkbox" id='push-notifications' className='Notifications-tab'/>
                <label htmlFor='push-notifications'>Push Notifications</label>
              </div>
            </div>
          </div>

          <hr />

          <div className='Settings-tab-group'>
            <h3 className='Settings-tab-group-header'>Security</h3>
            <div className='Settings-tab-group-tabs'>
              <div>
                <input type="checkbox" id='email-notifications' className='Notifications-tab'/>
                <label htmlFor='email-notifications'>Email Notifications</label>
              </div>
              <div>
                <input type="checkbox" id='push-notifications' className='Notifications-tab'/>
                <label htmlFor='push-notifications'>Push Notifications</label>
              </div>
            </div>
          </div>

          <hr />

          <div className='Settings-tab-group'>
            <h3 className='Settings-tab-group-header'>Unusual Activity Settings</h3>
            <div className='Settings-tab-group-tabs'>
              <div>
                <input type="checkbox" id='email-notifications' className='Notifications-tab'/>
                <label htmlFor='email-notifications'>Email Notifications</label>
              </div>
              <div>
                <input type="checkbox" id='push-notifications' className='Notifications-tab'/>
                <label htmlFor='push-notifications'>Push Notifications</label>
              </div>
            </div>
          </div>

          <hr />

          <div className='Settings-tab-group'>
            <h3 className='Settings-tab-group-header'>Alerts Settings</h3>
            <div className='Settings-tab-group-tabs'>
              <div>
                <input type="checkbox" id='email-notifications' className='Notifications-tab'/>
                <label htmlFor='email-notifications'>Email Notifications</label>
              </div>
              <div>
                <input type="checkbox" id='push-notifications' className='Notifications-tab'/>
                <label htmlFor='push-notifications'>Push Notifications</label>
              </div>
            </div>
          </div>

          <hr />

        </div>
      </div>
    );
  }
 
  Settings.propTypes = {
   toggle: PropTypes.bool
  };
  
export default Settings;
