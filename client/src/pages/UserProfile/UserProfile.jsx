import "./UserProfile.css";
import { useState, useEffect } from "react";
import { Box, Button, Tabs, Tab } from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useNavigate } from "react-router";

import Panel from "../../components/Panel/Panel";
import CustomTabPanel from "../../components/CustomTabPanel/CustomTabPanel";
import getFromLocalStorage from "../../utils/getFromLocalStorage";
import fetchUserData from "../../utils/fetchUserData";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const UserProfile = ({ themeMode }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const [value, setValue] = useState(0);
    const [userData, setUserData] = useState({
        username: "username",
        email: "user@user.com",
        accountImageUrl:
            "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg",
    });

    useEffect(() => {
        const currentEmail = getFromLocalStorage("lastLoginCredentials").email;
        fetchUserData(currentEmail, setUserData);
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

    const handleEditProfileClicked = () => {
        navigate("/profile", { state: window.location.pathname });
    };

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
                                src={userData.accountImageUrl}
                                alt=""
                            />
                        </Box>
                    </Box>
                    <Box className="UProfile__user-contact-container">
                        <p className="UProfile__contact-info">
                            @{userData.username}
                        </p>
                        <p className="UProfile__contact-info">
                            email: {userData.email}
                        </p>
                        <p className="UProfile__contact-info">
                            website: https://www.mysite.com
                        </p>
                    </Box>
                    <Box className="UProfile__social-icons-container">
                        <Box
                            className="UProfile__social-icon fb-color"
                            onClick={() => handleSocialIconClicked("fb")}
                        >
                            <FacebookIcon />
                        </Box>
                        <Box
                            className="UProfile__social-icon insta-color"
                            onClick={() => handleSocialIconClicked("insta")}
                        >
                            <InstagramIcon />
                        </Box>
                        <Box
                            className="UProfile__social-icon x-color"
                            onClick={() => handleSocialIconClicked("x")}
                        >
                            <TwitterIcon />
                        </Box>
                        <Box
                            className="UProfile__social-icon wa-color"
                            onClick={() => handleSocialIconClicked("wa")}
                        >
                            <WhatsAppIcon />
                        </Box>
                        <Box
                            className="UProfile__social-icon gh-color"
                            onClick={() => handleSocialIconClicked("gh")}
                        >
                            <GitHubIcon />
                        </Box>
                    </Box>
                </Box>
                <Box className="UProfile__middle-section">
                    <Box className="UProfile__user-info-container">
                        <p className="UProfile__about-info">
                            {userData.username}
                        </p>
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
                        onClick={handleEditProfileClicked}
                    >
                        Edit Profile
                    </Button>
                </Box>
            </Box>
        </Panel>
    );
};

export default UserProfile;
