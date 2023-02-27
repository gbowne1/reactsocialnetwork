import React from 'react';
import '../assets/NotFound.css';
import PropTypes from 'prop-types';


const NotFound = ({toggle}) => {
  
  const theme = toggle ? "light-mode" : "dark-mode";

  return (
    <div className={`NotFound-container ${theme}`}>
      <div className="NotFound-header">
        <h3 className="NotFound-title"><b>404 NotFound</b></h3>
      </div>
    </div>
  );
}

NotFound.propTypes = {
  toggle: PropTypes.bool
 };

export default NotFound;
