import { React, useState } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Input,
  MenuItem,
  Menu,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material/";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import MailIcon from "@mui/icons-material/Mail";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import NotificationBell from "./NotificationBell";
import { saveToLocalStorage } from "../utils";
import "../assets/TopNav.css";
import {useNavigate } from "react-router";

export default function TopNav({
  themeMode,
  handleThemeModeChange,
  setIsSideNavVisible,
  isSideNavVisible,
}) {
  
  let navigate = useNavigate(); 

  const themeAccentColor = themeMode === "light-mode" ? "#30489f" : "#FFD369";

  // Those variables are hardcoded but would be fetched from database i guess
  const newMessagesCount = 0;
  const notifications = [
    {
      id: 0,
      label: "This is your first notification!",
    },
    {
      id: 1,
      label: "This is your second notification!",
    },
  ];
  const isUserLoggedIn = false;

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSideNavOpen = () => {
    setIsSideNavVisible(!isSideNavVisible);
  };

  const handleSettingsClicked = () => {
    window.location.href = "/settings";
  };

  const handleHelpClicked = () => {
    window.location.href = "/help";
  };

  const handleFeedbackClicked = () => {
    // window.location.href = "/feedback";
    navigate("/feedback", {state: window.location.pathname});
  };

  const handleLogoutClicked = () => {
    saveToLocalStorage("lastLoginCredentials", null);
    window.location.href = "/";
  };

  const handleMyAccountClicked = () => {
    window.location.href = "/profile";
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleSettingsClicked}>
        <SettingsIcon
          color="action"
          sx={{
            marginRight: "5px",
            color: "",
          }}
        />{" "}
        Settings
      </MenuItem>
      <MenuItem onClick={handleHelpClicked}>
        <HelpIcon
          color="action"
          sx={{
            marginRight: "5px",
          }}
        />{" "}
        Help
      </MenuItem>
      <MenuItem onClick={handleFeedbackClicked}>
        <FeedbackIcon
          color="action"
          sx={{
            marginRight: "5px",
          }}
        />{" "}
        Feedback
      </MenuItem>

      <MenuItem onClick={handleLogoutClicked}>
        <LogoutIcon
          color="action"
          sx={{
            marginRight: "5px",
          }}
        />
        {isUserLoggedIn ? "Log In" : "Log out"}
      </MenuItem>
      <MenuItem onClick={handleMyAccountClicked}>
        <AccountBoxIcon
          color="action"
          sx={{
            marginRight: "5px",
          }}
        />
        My account
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label={`show chat with ${newMessagesCount} new messages`}
          color="inherit"
        >
          <Badge badgeContent={newMessagesCount} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <IconButton size="large" aria-label="show chat" color="inherit">
          <ChatIcon />
        </IconButton>
        <p>Chat</p>
      </MenuItem>

      <MenuItem>
        <NotificationBell
          notifications={notifications}
          setOpen={null}
          iconColor="action"
        />
        <p>Notifications</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={`Top-nav ${themeMode}`} position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleSideNavOpen}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            LOGO
          </Typography>

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                alignItems: "center",
                gap: "5px",
              },
              ml: 2,
            }}
          >
            <Input
              className={`Top-nav-search ${themeMode}`}
              sx={{ ":after": { borderBottomColor: themeAccentColor } }}
            ></Input>
            <SearchIcon sx={{ color: themeAccentColor }} />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label={`show chat with ${newMessagesCount} new messages`}
              color="inherit"
            >
              <Badge badgeContent={newMessagesCount} color="error">
                <MailIcon />
              </Badge>
            </IconButton>

            <IconButton size="large" aria-label="show chat" color="inherit">
              <ChatIcon />
            </IconButton>

            <NotificationBell
              notifications={notifications}
              setOpen={null}
              iconColor="action"
            />
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>

          <Box sx={{ ml: 2 }}>
            <Switch
              onClick={() => handleThemeModeChange()}
              inputProps={{ "aria-label": "Toggle theme" }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

TopNav.propTypes = {
  themeMode: PropTypes.string,
  handleThemeModeChange: PropTypes.func,
  setIsSideNavVisible: PropTypes.func,
  isSideNavVisible: PropTypes.bool,
};
