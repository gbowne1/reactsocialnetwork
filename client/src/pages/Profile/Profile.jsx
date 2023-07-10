import React, { useEffect, useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [openModal, setOpenModal] = useState(null);

  useEffect(() => {
    setOpenModal(true);
  }, []);

  const [formData, setFormData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [previewURL, setPreviewURL] = useState("");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    // Create a FileReader instance
    const reader = new FileReader();

    // Read the file and set the preview URL
    reader.onloadend = () => {
      setPreviewURL(reader.result);
    };
    // Read the file as a data URL
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    let userData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      userData.profilePicture = fileName;

      console.log({ userData });
    }
  };

  return (
    <div className="profile">
      {openModal && (
        <div className="Profile-container">
          <button className="Close-button">
            <span
              className="icon"
              onClick={(prev) => {
                setOpenModal(!prev);
              }}
            >
              &times;
            </span>
          </button>

          <form className="infoForm" onSubmit={handleSubmit}>
            <h3>Create Profile</h3>

            <div>
              Profile image
              <input
                type="file"
                name="profileImage"
                onChange={handleFileSelect}
              />
            </div>
            {previewURL && (
              <img className="preview-image" src={previewURL} alt="Preview" />
            )}

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
              style={{ width: "90%" }}
              rows={5}
              value={formData.bio}
              onChange={handleChange}
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
