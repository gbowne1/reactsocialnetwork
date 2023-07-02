import React, { useState } from "react";
import PropTypes from "prop-types";
import CloseButton from "../CloseButton/CloseButton"
import "./Post.css";

const Post = ({accountImage, accountName, postDate, postText, postImage}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="post" data-testid="post">
        <div className="post-header">
          <div className="post-image-container">
            <img
              data-testid="account-image"
              src={accountImage}
              alt=""
            />
          </div>
          <div className="post-account-data-container">
            <div className="post-account" data-testid="account-name">{accountName}</div>
            <div className="post-date" data-testid="post-date">{postDate}</div>
          </div>
          <CloseButton handleClose={handleClose} dataTestid="post-close-button" />
        </div>

        <div className="post-content" >
          <div className="post-text" data-testid="post-text">
            {postText}
          </div>

          <div className="post-content-image-container">
            <img
              data-testid="post-image"
              src={postImage}
              alt=""
            />
          </div>
        </div>
      </div>
    )
  );
};


Post.propTypes = {
  accountImage: PropTypes.string,
  accountName: PropTypes.string,
  postDate: PropTypes.string,
  postText: PropTypes.string,
  postImage: PropTypes.string,
};

export default Post;
