import "./PostForm.css";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

import getFromLocalStorage from "../../utils/getFromLocalStorage";
import fetchUserData from "../../utils/fetchUserData";

const PostForm = ({ themeMode, posts, setPosts, userAvatar = null }) => {
    const [postText, setPostText] = useState("");
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const currentEmail = getFromLocalStorage("lastLoginCredentials")?.email;
        if (currentEmail) {
            fetchUserData(currentEmail, setUserData);
        }
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const defaultUserImage =
            "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg";
        const lastLoginCredentials = getFromLocalStorage("lastLoginCredentials");
        const username = lastLoginCredentials?.username || "Anonymous";

        const newPost = {
            accountImage: userData.accountImageUrl || defaultUserImage,
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
                } else {
                    fetch("http://localhost:9000/api/posts/")
                        .then((res) => res.json())
                        .then((res) => {
                            setPosts(res.data);
                        });
                }
            });

        setPostText(""); // Clear input field after submission
    };

    return (
        <form className={`PostForm__create ${themeMode}`} onSubmit={onSubmit}>
            <div className="PostForm__basics">
                <div className="PostForm__avatar">
                    {userAvatar ? (
                        <img src={userAvatar} alt="User Avatar" />
                    ) : (
                        <IconButton className="PostForm__empty-avatar">
                            <AccountCircleIcon sx={{ color: "#fff" }} />
                        </IconButton>
                    )}
                </div>

                <input
                    placeholder="What's on your mind?"
                    className={`PostForm__input ${themeMode}`}
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    type="text"
                    autoComplete="off"
                />

                <IconButton className={`PostForm__submit ${themeMode}`} type="submit">
                    <SendIcon sx={{ color: "inherit" }} />
                </IconButton>
            </div>
        </form>
    );
};

PostForm.propTypes = {
    themeMode: PropTypes.string,
    posts: PropTypes.array.isRequired,
    setPosts: PropTypes.func.isRequired,
    userAvatar: PropTypes.string,
};

export default PostForm;
