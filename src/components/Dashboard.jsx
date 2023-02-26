import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../assets/Dashboard.css';
import { VscChromeClose } from "react-icons/vsc";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './Home';
// import Settings from './Settings';
// import Admin from './Admin';
// import Login from './Login';

function Dashboard({toggle}) {
  const [isOpen, setIsOpen] = useState(true);

  const theme = toggle ? "light-mode" : "dark-mode";

  function handleClose() {
    setIsOpen(false);
  }
  
    return (
      <>
      { isOpen && (
      <div className={`Dashboard ${theme}`}>
        <div className={`Dashboard-header ${theme}`}>
          <h3 className="Dashboard-title">Dashboard</h3>
            <VscChromeClose className='icon' onClick={handleClose} />
        </div>
        <section className={`Dashboard-content ${theme}`}>

        </section>
        <h4>Welcome to your dashboard!</h4>
      </div>
      )}
      </>
    );
  
}
Dashboard.propTypes = {
  toggle: PropTypes.bool
 };

export default Dashboard;
