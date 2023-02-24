import {React, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import '../assets/TopNav.css'
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import MailIcon from '@mui/icons-material/Mail';
import ChatIcon from '@mui/icons-material/Chat';
import {Input, Switch } from '@mui/material';

export default function TopNav({toggle, setToggle, setIsSideNavVisible, isSideNavVisible}) {

  const theme = toggle ? "light-mode" : "dark-mode";
  const themeAccentColor = theme === "light-mode" ? "#30489f" : "#FFD369";

  // Those variables are hardcoded but would be fetched from database i guess
  const newMessagesCount = 0;
  const notificationsCount = 0;
  const isUserLoggedIn = false;
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState(null);

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
    setIsSideNavVisible(!isSideNavVisible)
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>{isUserLoggedIn ? "Log In" : "Log out"}</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label={`show chat with ${newMessagesCount} new messages`} color="inherit">
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
        <IconButton
          size="large"
          aria-label={`show ${notificationsCount} new notifications`}
          color="inherit"
        >
          <Badge badgeContent={notificationsCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
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
      <AppBar 
        className={`Top-nav ${theme}`}
        position="fixed" 
      >
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
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            LOGO
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex', alignItems:"center", gap: "5px" }, ml: 2 }}>
            <Input
              className={`Top-nav-search ${theme}`}   
              sx={{':after': { borderBottomColor: themeAccentColor }}}
            >
            </Input>
            <SearchIcon
              sx={{color: themeAccentColor}}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

            <IconButton size="large" aria-label={`show chat with ${newMessagesCount} new messages`} color="inherit">
              <Badge badgeContent={newMessagesCount} color="error">
                <MailIcon />
              </Badge>
            </IconButton>

            <IconButton size="large" aria-label="show chat" color="inherit">
              <ChatIcon />
            </IconButton>

            <IconButton
              size="large"
              aria-label={`show ${notificationsCount} new notifications`}
              color="inherit"
            >
              <Badge badgeContent={notificationsCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

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

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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

          <Box sx={{ml: 2}}>
            <Switch
              onClick={() => setToggle(!toggle)}
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
  toggle: PropTypes.bool,
  setToggle: PropTypes.func,
  setIsSideNavVisible: PropTypes.func,
  isSideNavVisible: PropTypes.bool,
 };

// import React from "react";
// import "../assets/TopNav.css";
// import Switch from "@mui/material/Switch";
// import Tooltip from "@mui/material/Tooltip";
// import LoginIcon from "@mui/icons-material/Login";
// import IconButton from "@mui/material/IconButton";
// import SearchIcon from "@mui/icons-material/Search";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import SettingsIcon from "@mui/icons-material/Settings";
// import HelpIcon from "@mui/icons-material/Help";
// import PropTypes from 'prop-types';

// const TopNav = ({setToggle, toggle}) => {
//     return (
//         <nav className="App-logo">
//         <img src="./logo512.png" width="192" height="192" alt="logo"></img>
//         <form className="d-flex">
//           <input
//             className="form-control"
//             type="search"
//             id="search"
//             placeholder="Search"
//             aria-label="search"
//             role="searchbox"
//             aria-labelledby="search"
//             aria-describedby="search"
//           ></input>
//           <IconButton className="search-button" aria-label="search-button">
//             <SearchIcon
//               aria-label="search"
//               aria-labelledby="search"
//               sx={{ color: "#fff" }}
//             />
//           </IconButton>
//           <IconButton aria-label="login-button">
//             <LoginIcon
//               aria-label="login"
//               aria-labelledby="login"
//               sx={{ color: "#fff" }}
//             />
//           </IconButton>
//           <IconButton aria-label="notifications-button">
//             <NotificationsIcon
//               aria-label="notifications"
//               aria-labelledby="notifications"
//               sx={{ color: "#fff" }}
//             />
//           </IconButton>
//           <IconButton aria-label="chat-button">
//             <ChatBubbleIcon sx={{ color: "#fff" }} />
//           </IconButton>
//           <Tooltip title="Messages">
//             <IconButton aria-label="messages-button">
//               <MailOutlineIcon sx={{ color: "#fff" }} />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Settings">
//             <IconButton aria-label="settings-button">
//               <SettingsIcon
//                 aria-label="user settings"
//                 aria-labelledby="settings"
//                 sx={{ color: "#fff" }}
//               />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Help">
//             <IconButton aria-label="help-button">
//               <HelpIcon
//                 aria-label="help"
//                 aria-labelledby="help"
//                 sx={{ color: "#fff" }}
//               />
//             </IconButton>
//           </Tooltip>
//           <Switch
//             onClick={() => setToggle(!toggle)}
//             inputProps={{ "aria-label": "Toggle theme" }}
//           />
//           <IconButton aria-label="account-management-button">
//             <AccountCircleIcon
//               aria-label="account of current user"
//               aria-controls="menu-account"
//               aria-haspopup="menu"
//               sx={{ color: "#fff" }}
//             />
//           </IconButton>
//         </form>
//       </nav>
//     )
// }

// TopNav.propTypes = {
//   setToggle: PropTypes.func,
//   toggle: PropTypes.bool
// };

// export default TopNav;