import React from 'react';
import '../assets/Footer.css';
import PropTypes from 'prop-types';

function Footer({themeMode}){

  const theme = themeMode ? "light-mode" : "dark-mode"
  
  return (
    <footer className={`Footer-body ${theme}`}>
      <div className="row">
        <div className="col">
        </div>
      </div>
      <section className={`Footer-footer ${theme}`}>
        <ul>
          <li>
            <a href="/terms">Terms & Conditions</a>
          </li>
          <li>
            <a href="/terms">Privacy Policy</a>
          </li>
        </ul>
      </section>
    </footer>
  );
}

Footer.propTypes = {
  themeMode: PropTypes.bool
 };

export default Footer;
