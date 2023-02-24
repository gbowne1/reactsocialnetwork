import React from 'react';
import '../assets/Footer.css';


function Footer(){
    return (
      <footer className="Footer-body">
        <div className="row">
          <div className="col">
          </div>
        </div>
        <section className="Footer-footer">
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

export default Footer;
