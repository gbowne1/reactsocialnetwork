import React, {useState} from 'react';
import '../assets/UserProfile.css';
import PropTypes from 'prop-types';
import { VscChromeClose } from 'react-icons/vsc';

function UserProfile({toggle}){
  const [isOpen, setIsOpen] = useState(true);

  const theme = toggle ? "light-mode" : "dark-mode";

  function handleClose() {
    setIsOpen(false);
  }
    return (
      <>
      { isOpen && (
      <div className={`Userprofile ${theme}`}>
        <div className={`Userprofile-header ${theme}`}>
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
