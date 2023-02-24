import React, {useState} from 'react';
import PropTypes from 'prop-types';
import '../assets/Post.css';
import { VscChromeClose } from "react-icons/vsc";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './Home';
// import Settings from './Settings';
// import Admin from './Admin';
// import Login from './Login';

function Post({toggle}) { 
  const [isOpen, setIsOpen] = useState(true);

const handleClose = () => {
  setIsOpen(!isOpen);
};
  
    return (
      <>
        {isOpen && (
          <div
            className={`Section-container  ${
              toggle ? "light-mode" : "dark-mode"
            }`}
          >
            <div
              className={`Post-header  ${
                toggle ? "light-mode-header" : "dark-mode-header"
              }`}
            >
              <h3 className="Post-title">Post</h3>
              <VscChromeClose className="icon" onClick={handleClose} />
            </div>
            <h4>Welcome to your Post!</h4>
          </div>
        )}
      </>
    );
  
}
Post.propTypes = {
  toggle: PropTypes.bool
 };

export default Post;