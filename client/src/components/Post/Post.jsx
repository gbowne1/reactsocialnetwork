import "./Post.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import CloseButton from "../CloseButton/CloseButton";

const Post = ({
    themeMode,
    accountImage,
    accountName,
    postDate,
    postText,
    postImage,
}) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        isOpen && (
            <div className={`Post ${themeMode}`} data-testid="post">
                <div className={`Post__header ${themeMode}`}>
                    <div className="Post__image-container">
                        <img
                            data-testid="account-image"
                            src={accountImage}
                            alt=""
                        />
                    </div>
                    <div className="Post__account-data-container">
                        <div
                            className="Post__account"
                            data-testid="account-name"
                        >
                            {accountName}
                        </div>
                        <div className="Post__date" data-testid="post-date">
                            {postDate}
                        </div>
                    </div>
                    <CloseButton
                        className={`Post__close-button ${themeMode}`}
                        dataTestid="post-close-button"
                        handleClose={handleClose}
                    />
                </div>

                <div className="Post__content">
                    <div
                        className={`Post__text ${themeMode}`}
                        data-testid="post-text"
                    >
                        {postText}
                    </div>

                    <div className="Post__content-image-container">
                        <img data-testid="post-image" src={postImage} alt="" />
                    </div>
                </div>
            </div>
        )
    );
};

Post.propTypes = {
    themeMode: PropTypes.string,
    accountImage: PropTypes.string,
    accountName: PropTypes.string,
    postDate: PropTypes.string,
    postText: PropTypes.string,
    postImage: PropTypes.string,
};

export default Post;
