import { useState, useEffect } from "react";
import { Box, Button, Tabs, Tab, Typography } from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GitHubIcon from "@mui/icons-material/GitHub";

import Panel from "../../components/Panel/Panel";

import getFromLocalStorage from "../../utils/getFromLocalStorage";

import "./UserProfile.css";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography align="left">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const UserProfile = ({ themeMode }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [value, setValue] = useState(0);
    const [username] = useState(
        getFromLocalStorage("lastLoginCredentials").username || ""
    );
    const [email] = useState(
        getFromLocalStorage("lastLoginCredentials").email || ""
    );

    const [imageUrl, setImageUrl] = useState(
        "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
    );

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

                setImageUrl(fetchedCurrentUserData.accountImageUrl);
                console.log(fetchedCurrentUserData.accountImageUrl);
            });
    }, []);

    const handleSocialIconClicked = (social) => {
        let url = "";
        if (social === "fb") url = "http://www.facebook.com/";
        if (social === "insta") url = "http://www.instagram.com/";
        if (social === "x") url = "http://www.twitter.com/";
        if (social === "wa") url = "http://www.whatsapp.com/";
        if (social === "gh") url = "http://www.github.com/";

        window.open(url, "_blank");
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
    }

    return (
        <Panel
            themeMode={themeMode}
            titleHeading="Profile"
            contentHeading="Welcome to user profile!"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <Box className={`UProfile__content ${themeMode}`}>
                <Box className="UProfile__top-section">
                    <Box className="UProfile__avatar-container">
                        <Box className="UProfile__image-container">
                            <img
                                data-testid="account-image"
                                src={imageUrl}
                                alt=""
                            />
                        </Box>
                    </Box>
                    <Box className="UProfile__user-contact-container">
                        <p className="UProfile__contact-info">@{username}</p>
                        <p className="UProfile__contact-info">email: {email}</p>
                        <p className="UProfile__contact-info">
                            website: https://www.mysite.com
                        </p>
                    </Box>
                    <Box className="UProfile__social-icons-container">
                        <Box
                            className="UProfile__social-icon"
                            onClick={() => handleSocialIconClicked("fb")}
                        >
                            <FacebookIcon />
                        </Box>
                        <Box
                            className="UProfile__social-icon"
                            onClick={() => handleSocialIconClicked("insta")}
                        >
                            <InstagramIcon />
                        </Box>
                        <Box
                            className="UProfile__social-icon"
                            onClick={() => handleSocialIconClicked("x")}
                        >
                            <TwitterIcon />
                        </Box>
                        <Box
                            className="UProfile__social-icon"
                            onClick={() => handleSocialIconClicked("wa")}
                        >
                            <WhatsAppIcon />
                        </Box>
                        <Box
                            className="UProfile__social-icon"
                            onClick={() => handleSocialIconClicked("gh")}
                        >
                            <GitHubIcon />
                        </Box>
                    </Box>
                </Box>
                <Box className="UProfile__middle-section">
                    <Box className="UProfile__user-info-container">
                        <p className="UProfile__about-info">{username}</p>
                        <p className="UProfile__about-info">Full Name</p>
                        <p className="UProfile__about-info">Location</p>
                        <p className="UProfile__about-info">Career</p>
                        <p className="UProfile__about-info">Workplace</p>
                        <p className="UProfile__about-info">Education</p>
                    </Box>
                    <Box className="UProfile__user-details-container">
                        <Box className="UProfile__user-details">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="basic tabs example"
                            >
                                <Tab label="Details" {...a11yProps(0)} />
                                <Tab label="User Feed" {...a11yProps(1)} />
                                <Tab label="Messages" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            Hobbies: <hr /> Interests: <hr />
                            Favorites:
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            User Feed
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            Messages
                        </CustomTabPanel>
                    </Box>
                </Box>
                <Box className="UProfile__bottom-section">
                    <Button
                        className="UProfile__user-action-button"
                        variant="contained"
                    >
                        Share
                    </Button>
                    <Button
                        className="UProfile__user-action-button"
                        variant="contained"
                    >
                        Add Friend
                    </Button>
                    <Button
                        className="UProfile__user-action-button"
                        variant="contained"
                    >
                        Message
                    </Button>
                    <Button
                        className="UProfile__user-action-button"
                        variant="contained"
                    >
                        Edit Profile
                    </Button>
                </Box>
            </Box>
        </Panel>
    );
};

export default UserProfile;
