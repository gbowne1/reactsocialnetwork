import React from 'react';
import '../assets/Dashboard.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './Home';
// import Settings from './Settings';
// import Admin from './Admin';
// import Login from './Login';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="Dashboard-container">
        <div className="Dashboard-header">
          <h3 className="Dashboard-title">Dashboard</h3>
        </div>
        <h4>Welcome to your dashboard!</h4>
      </div>
    );
  }
}

export default Dashboard;
