import React, {useState} from 'react';
import '../assets/UserProfile.css';
import PropTypes from 'prop-types';
import { VscChromeClose } from 'react-icons/vsc';

function UserProfile({toggle}){
const [isOpen, setIsOpen] = useState(true);

function handleClose() {
  setIsOpen(false);
}
    return (
      <>
      { isOpen && (
      <div className={`Section-container ${toggle?"light-mode":"dark-mode"}`}>
        <div className={`Userprofile-header ${toggle?"light-mode-header":"dark-mode-header"}`}>
          <h3 className="Userprofile-title">Userprofile</h3>
          <VscChromeClose className='icon' onClick={handleClose} />
        </div>
      </div>
    )}
    </>
    );
  
}
UserProfile.propTypes = {
  toggle: PropTypes.bool
 };

export default UserProfile;
