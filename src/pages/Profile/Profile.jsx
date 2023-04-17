import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    if (!userData) {
      // Fetch user data from local storage or API here
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUserData(storedUser);
      } else {
        // Redirect to login page if no user data is found
        navigate('/login');
      }
    }
  }, [userData, navigate]);

  return (
    <div className="user-profile">
      <header className="user-profile-header">User Profile</header>
      <div className="user-profile-content">
        {/* Display user data here */}
        <p>Name: {userData?.name}</p>
        <p>Email: {userData?.email}</p>
      </div>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default Profile;
