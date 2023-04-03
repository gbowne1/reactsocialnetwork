import React from 'react';
import './NotFound.css';
import PropTypes from 'prop-types';


const NotFound = ({themeMode}) => {
  
  return (
    <div className={`NotFound-container ${themeMode}`}>
      <div className="NotFound-header">
        <h3 className="NotFound-title"><b>404 NotFound</b></h3>
      </div>
    </div>
  );
}

NotFound.propTypes = {
  themeMode: PropTypes.string
 };

export default NotFound;
