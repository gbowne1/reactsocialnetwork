import React from 'react';
import '../assets/Header.css';

class Header extends React.Component {
  render() {
    return (
      <header className="container">
        <div className="navigation">
          <nav className="navbar">
            <span className>☰ Open</span>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
