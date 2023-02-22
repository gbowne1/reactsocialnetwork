import React from 'react';
import PropTypes from 'prop-types';
import '../assets/Settings.css';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';

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
            <FormGroup className='Settings-tab-group-tabs'>
              <FormControlLabel 
                control={
                  <Switch 
                    size='small' 
                    className='Settings-switch'/>
                  } 
                label="Email Notifications" 
                className='Settings-switch-wrapper'
              />
              <FormControlLabel 
                control={
                  <Switch 
                    size='small' 
                    className='Settings-switch'/>
                  } 
                label="Push Notifications" 
                className='Settings-switch-wrapper'
              />
            </FormGroup>
          </div>

          <hr />

          <div className='Settings-tab-group'>
            <h3 className='Settings-tab-group-header'>Security</h3>
            <FormGroup className='Settings-tab-group-tabs'>
              {/* Place for Security tabs */}
            </FormGroup>
          </div>

          <hr />

          <div className='Settings-tab-group'>
            <h3 className='Settings-tab-group-header'>Unusual Activity Settings</h3>
            <FormGroup className='Settings-tab-group-tabs'>
              {/* Place for Unusual Activity Settings tabs */}
            </FormGroup>
          </div>

          <hr />

          <div className='Settings-tab-group'>
            <h3 className='Settings-tab-group-header'>Alerts Settings</h3>
            <FormGroup className='Settings-tab-group-tabs'>
              {/* Place for Alerts Settings tabs */}
            </FormGroup>
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
