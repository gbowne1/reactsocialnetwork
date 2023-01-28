import React from 'react';
import PropTypes from 'prop-types';
import '../assets/Dashboard.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './Home';
// import Settings from './Settings';
// import Admin from './Admin';
// import Login from './Login';

function Dashboard({toggle}) {
  
    return (
      <div className={`Dashboard-container  ${toggle?"light-mode":"dark-mode"}`}>
        <div className={`Dashboard-header  ${toggle?"light-mode-header":"dark-mode-header"}`}>
          <h3 className="Dashboard-title">Dashboard</h3>
        </div>
        <h4>Welcome to your dashboard!</h4>
      </div>
    );
  
}
Dashboard.propTypes = {
  toggle: PropTypes.bool
 };

export default Dashboard;
