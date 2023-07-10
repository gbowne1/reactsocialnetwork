import PropTypes from "prop-types";
import "./Post.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import MoodIcon from "@mui/icons-material/Mood";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import React from "react";

function Post({ themeMode, userAvatar, userName = "" }) {
  return (
    <div className={`Post ${themeMode}`}>
      <div className={`Post-header ${themeMode}`}>
        <h3 className="Post-title">Post</h3>
      </div>

      <h4>Welcome to your Post {userName}!</h4>

      <form className={`Post-create ${themeMode}`}>
        <div className="Post-basics">
          <div className="Post-avatar">
            {userAvatar ? (
              <img src={userAvatar} alt="user avatar" />
            ) : (
              <IconButton
                className="Post-empty-avatar"
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
            placeholder="Start a post"
            aria-invalid="false"
            aria-label="Post text input"
            className={`Post-text ${themeMode}`}
            type="text"
            autoComplete="off"
          />

          <IconButton
            className={`Post-submit ${themeMode}`}
            aria-label="search button"
            type="submit"
          >
            <SendIcon
              fontSize="inherit"
              aria-label="submit post"
              aria-labelledby="submit post"
              sx={{ color: "inherit" }}
            />
          </IconButton>
        </div>

        <div className="Post-uploads">
          <IconButton
            className="Post-upload-btn"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" multiple type="file" />
            <InsertPhotoIcon
              fontSize="inherit"
              aria-label="upload picture"
              aria-labelledby="upload picture"
              sx={{ color: "#054a91" }}
            />
            <span className={`Post-icon-label ${themeMode}`}>Add Photo</span>
          </IconButton>

          <IconButton
            className="Post-upload-btn"
            aria-label="upload video"
            component="label"
          >
            <input hidden accept="video/*" multiple type="file" />
            <VideoFileIcon
              fontSize="inherit"
              aria-label="upload video"
              aria-labelledby="upload video"
              sx={{ color: "#931621" }}
            />
            <span className={`Post-icon-label ${themeMode}`}>Add Video</span>
          </IconButton>

          <IconButton
            className="Post-upload-btn"
            aria-label="add mood"
            component="label"
          >
            <MoodIcon
              fontSize="inherit"
              aria-label="add mood"
              aria-labelledby="add mood"
              sx={{ color: "#FFD369" }}
            />
            <span className={`Post-icon-label ${themeMode}`}>Add Mood</span>
          </IconButton>
        </div>
      </form>
    </div>
  );
}
Post.propTypes = {
  themeMode: PropTypes.string,
  // I think avatar could be passed as an image src
  userAvatar: PropTypes.node,
  userName: PropTypes.string,
};

export default Post;
