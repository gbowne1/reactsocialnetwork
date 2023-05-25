import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {

  const [openModal, setOpenModal] = useState(null);

  useEffect(() => {
    setOpenModal(true);
  }, []);


  const [formData, setFormData] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
        setProfileImage(img);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;

    }
  }

  return (
    <div className='profile'>

      {openModal && (
      <div className="Profile-container">
        <button className="Close-button">
          <span className='icon' onClick={(prev) =>{setOpenModal(!prev)} }>&times;</span>
        </button>

      <form className="infoForm" onSubmit={handleSubmit}>
        <h3>Create Profile</h3>

        <div>
          Profile image
          <input type="file" name="profileImage" onChange={onImageChange} />
        </div>
        <div>
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
        <div>
          <input
              value={formData.username}
              onChange={handleChange}
              type="text"
              placeholder="Username"
              name="username"
              className="infoInput"
          />
        </div>
        <div>
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
        <textarea
          style={{width: '90%'}} 
          rows={5}
          value={formData.bio}
          onChange={handleChange}
          type="text"
          className="infoInput"
          placeholder="Bio"
          name="bio"
        />
        <div>
          <input
            value={formData.website}
            onChange={handleChange}
            type="text"
            placeholder="Website"
            name="website"
            className="infoInput"
          />
        </div>
        <div>
          <input
            value={formData.interest}
            onChange={handleChange}
            type="text"
            placeholder="Interest"
            name="interest"
            className="infoInput"
          />
        </div>
        <div>
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
      </div>
      )}
    </div>
  );
};

export default Profile;
