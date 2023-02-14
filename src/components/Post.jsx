import React from 'react';
import PropTypes from 'prop-types';
import '../assets/Post.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './Home';
// import Settings from './Settings';
// import Admin from './Admin';
// import Login from './Login';

function Post({toggle}) {
  
    return (
      <div className={`Section-container  ${toggle?"light-mode":"dark-mode"}`}>
        <div className={`Post-header  ${toggle?"light-mode-header":"dark-mode-header"}`}>
          <h3 className="Post-title">Post</h3>
        </div>
        <h4>Welcome to your Post!</h4>
      </div>
    );
  
}
Post.propTypes = {
  toggle: PropTypes.bool
 };

export default Post;