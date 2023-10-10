import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import MoodIcon from "@mui/icons-material/Mood";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

import getFromLocalStorage from "../../utils/getFromLocalStorage";

import "./PostForm.css";

const PostForm = ({ themeMode, posts, setPosts, userAvatar = null }) => {

  const [postText, setPostText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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

        setImageUrl(fetchedCurrentUserData.accountImageUrl)
        console.log(fetchedCurrentUserData.accountImageUrl);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const defaultUserImage =
      "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg";
    const lastLoginCredentials = getFromLocalStorage("lastLoginCredentials");
    const username = lastLoginCredentials.username;

    const newPost = {
      accountImage: imageUrl || defaultUserImage,
      accountName: username,
      postDate: new Date().toDateString(),
      postText: postText,
      postImage:
        "https://static.vecteezy.com/system/resources/previews/012/168/187/non_2x/beautiful-sunset-on-the-beach-with-palm-tree-for-travel-and-vacation-free-photo.JPG",
    };

    fetch("http://localhost:9000/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert(res.error);
        }

        // Fetch all posts from db
        fetch("http://localhost:9000/api/posts/")
          .then((res) => res.json())
          .then((res) => {
            // And then set those posts with setEvent
            setPosts(res.data);
          });
      });

    // Clear form
    setPostText("");
  };

  return (
    <div>
      {" "}
      <form
        className={`Post__create ${themeMode}`}
        onSubmit={onSubmit}
        data-testid="create-post-form"
      >
        <div className="Post__basics">
          <div className="Post__avatar">
            {userAvatar ? (
              <img src={userAvatar} alt="user avatar" />
            ) : (
              <IconButton
                className="Post__empty-avatar"
                aria-label="search-button"
              >
                <AccountCircleIcon
                  fontSize="inherit"
                  aria-label="empty avatar"
                  aria-labelledby="empty avatar"
                  sx={{ color: "#fff" }}
                />
              </IconButton>
            )}
          </div>

          <input
            dir="ltr"
            placeholder="What's on your mind?"
            aria-invalid="false"
            aria-label="Post text input"
            className={`Post__input ${themeMode}`}
            data-testid="create-post-input"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            type="text"
            autoComplete="off"
          />

          <IconButton
            className={`Post__submit ${themeMode}`}
            aria-label="search button"
            type="submit"
            data-testid="create-post-submit-button"
          >
            <SendIcon
              fontSize="inherit"
              aria-label="submit post"
              aria-labelledby="submit post"
              sx={{ color: "inherit" }}
            />
          </IconButton>
                </div>
            </form>
        </div>
    );
};

PostForm.propTypes = {
    themeMode: PropTypes.string,
    posts: PropTypes.array,
    setPosts: PropTypes.func,
    userAvatar: PropTypes.node,
    userName: PropTypes.string,
};

export default PostForm;
