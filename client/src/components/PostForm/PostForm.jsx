import "./PostForm.css";
import React, { useEffect, useState, useReducer } from "react";
import PropTypes from "prop-types";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

import getFromLocalStorage from "../../utils/getFromLocalStorage";
import fetchUserData from "../../utils/fetchUserData";

const formReducer = (state, action) => {
    switch (action.type) {
        case "SET_POST_TEXT":
            return { ...state, postText: action.payload };
        default:
            return state;
    }
};

const PostForm = ({
    themeMode = "light",
    posts = [],
    setPosts,
    userAvatar = null,
    userName,
}) => {
    const [state, dispatch] = useReducer(formReducer, { postText: "" });
    const [userData, setUserData] = useState({});

    useEffect(() => {
        fetchUserData(userName, setUserData);
    }, [userName]);

    useEffect(() => {
        const currentEmail = getFromLocalStorage("lastLoginCredentials").email;
        fetchUserData(currentEmail, setUserData);
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const defaultUserImage =
            "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg";
        const lastLoginCredentials = getFromLocalStorage(
            "lastLoginCredentials"
        );
        const username = lastLoginCredentials.username;

        const newPost = {
            accountImage: userData.accountImageUrl || defaultUserImage,
            accountName: username,
            postDate: new Date().toDateString(),
            postText: state.postText,
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
                    // Fetch all posts from db
                    fetch("http://localhost:9000/api/posts/")
                        .then((res) => res.json())
                        .then((res) => {
                            // And then set those posts with setEvent
                            setPosts(res.data);
                        })
                        .catch((error) => {
                            console.error("Error fetching posts:", error);
                        });
                }
            })
            .catch((error) => {
                console.error("Error creating post:", error);
            });
    };

    return (
        <div>
            {" "}
            <form
                className={`PostForm__create ${themeMode}`}
                onSubmit={onSubmit}
                data-testid="create-post-form"
            >
                <div className="PostForm__basics">
                    <div className="PostForm__avatar">
                        {userAvatar ? (
                            <img src={userAvatar} alt="user avatar" />
                        ) : (
                            <IconButton
                                className="PostForm__empty-avatar"
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
                        className={`PostForm__input ${themeMode}`}
                        data-testid="create-post-input"
                        value={state.postText}
                        onChange={(e) =>
                            dispatch({
                                type: "SET_POST_TEXT",
                                payload: e.target.value,
                            })
                        }
                        type="text"
                        autoComplete="off"
                    />

                    <IconButton
                        className={`PostForm__submit ${themeMode}`}
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
