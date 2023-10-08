import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Panel from "../../components/Panel/Panel";

import getFromLocalStorage from "../../utils/getFromLocalStorage";

import "./Profile.css";

const Profile = ({ themeMode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({});
  const [fetchedUserData, setFetchedUserData] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const currentUserData = getFromLocalStorage("lastLoginCredentials");
    const currentUsername = currentUserData.username;
    console.log(currentUsername);

    fetch("http://localhost:9000/api/users/")
      .then((res) => res.json())
      .then((res) => {
        const users = res.data;
        const fetchedCurrentUserData = users.filter(
          (user) => user.username === currentUsername
        )[0];

        setFetchedUserData(fetchedCurrentUserData);

        console.log(fetchedCurrentUserData);

        const currentUserId = fetchedCurrentUserData.id;
        setUserId(currentUserId);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Update userData
    const updatedUserData = {
      username: fetchedUserData.username,
      email: fetchedUserData.email,
      password: fetchedUserData.password,
      accountImageUrl: formData.imageUrl,
    };

    console.log(updatedUserData);

    fetch(`http://localhost:9000/api/user/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert(res.error);
        }
        console.log(res);
      });
  };

  return (
    <>
      <Panel
        themeMode={themeMode}
        titleHeading="Profile"
        contentHeading="Welcome to user profile!"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <form className="" onSubmit={handleSubmit}>
          <h3>Create Profile</h3>

          <div className="profile-section">
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              placeholder="Profile image Url"
              value={formData.imageUrl}
              onChange={handleChange}
              className="infoInput"
            />
          </div>

          <div className="profile-section">
            <input
              value={formData.firstname}
              onChange={handleChange}
              type="text"
              placeholder="First Name"
              name="firstname"
              className="infoInput"
            />
            <input
              value={formData.lastname}
              onChange={handleChange}
              type="text"
              placeholder="Last Name"
              name="lastname"
              className="infoInput"
            />
          </div>

          <div className="profile-section">
            <input
              value={formData.username}
              onChange={handleChange}
              type="text"
              placeholder="Username"
              name="username"
              className="infoInput"
            />
          </div>

          <div className="profile-section">
            <input
              value={formData.location}
              onChange={handleChange}
              type="text"
              placeholder="Location"
              name="location"
              className="infoInput"
            />
            <input
              value={formData.relationship}
              onChange={handleChange}
              type="text"
              className="infoInput"
              placeholder="Relationship status"
              name="relationship"
            />
          </div>

          <div className="profile-section">
            {" "}
            <textarea
              style={{ width: "90%" }}
              rows={5}
              value={formData.bio}
              onChange={handleChange}
              type="text"
              className="infoInput"
              placeholder="Bio"
              name="bio"
            />
          </div>

          <div className="profile-section">
            <input
              value={formData.website}
              onChange={handleChange}
              type="text"
              placeholder="Website"
              name="website"
              className="infoInput"
            />
            <input
              value={formData.interest}
              onChange={handleChange}
              type="text"
              placeholder="Interest"
              name="interest"
              className="infoInput"
            />
          </div>

          <div className="profile-section">
            <input
              value={formData.privarySetting}
              onChange={handleChange}
              type="text"
              placeholder="Privary Setting (public/private/friends only)"
              name="privarySetting"
              className="infoInput"
            />

            <input
              value={formData.notificationSetting}
              onChange={handleChange}
              type="text"
              placeholder="Notifictaion Setting (email/push notification)"
              name="notificationSetting"
              className="infoInput"
            />
          </div>

          <button className="infoButton" type="submit">
            Create
          </button>
        </form>
      </Panel>
    </>
  );
};

Profile.propTypes = {
  themeMode: PropTypes.string,
};

export default Profile;
