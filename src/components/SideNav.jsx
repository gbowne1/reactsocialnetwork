import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import '../assets/SideNav.css';

class SideNav extends React.Component {
  render() {
    return (
      <div className="Side-navigation" id="">
        <div className="container-fluid">
          <button
            href="/src/assets/scripts/closeNav.js"
            className="button"
            onClick="closeNav()">
            &times;
          </button>
          <Link to="/" />
          <Link to="/users" />
          <Link to="/blog" />
          <Link to="/chat" />
          <Link to="/settings" />
          <span onClick="openNav()">&#9776; Open</span>
        </div>
      </div>
    );
  }
}

export default SideNav;
