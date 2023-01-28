import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
// import logo from "./logo.svg";
import './App.css';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
// import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import UserProfile from './components/UserProfile';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Footer from './components/Footer';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
// import IconButton from '@mui/material/IconButton';
// import Login from "./components/Login";
// import NotFound from './pages/NotFound';
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

 const App =()=> {
 const [toggle,setToggle]=useState(true);
    return (
      <div className="App">
        <div className="container-fluid">
          <header className="App-header">
            <nav className="App-logo">
              <img
                src="../public/logo512.png"
                width="192"
                height="192"
                alt="logo"></img>
              <form className="d-flex">
                <input
                  className="form-control"
                  type="search"
                  id="search"
                  placeholder="Search"
                  aria-label="search"
                  role="searchbox"
                  aria-labelledby="search"
                  aria-describedby="search"></input>
                <IconButton className='search-button' >
                  <SearchIcon
                    aria-label="search"
                    aria-labelledby="search"
                    sx={{ color: '#fff' }}
                  />
                </IconButton>
                <IconButton>
                  <LoginIcon
                    aria-label="login"
                    aria-labelledby="login"
                    sx={{ color: '#fff' }}
                  />
                </IconButton>
                <IconButton>
                  <NotificationsIcon
                    aria-label="notifications"
                    aria-labelledby="notifications"
                    sx={{ color: '#fff' }}
                  />
                </IconButton>
                <IconButton>
                  <ChatBubbleIcon sx={{ color: '#fff' }} />
                </IconButton>
                <Tooltip title="Messages">
                  <IconButton>
                    <MailOutlineIcon sx={{ color: '#fff' }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Settings">
                  <IconButton>
                    <SettingsIcon
                      aria-label="user settings"
                      aria-labelledby="settings"
                      sx={{ color: '#fff' }}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Help">
                  <IconButton>
                    <HelpIcon
                      aria-label="help"
                      aria-labelledby="help"
                      sx={{ color: '#fff' }}
                    />
                  </IconButton>
                </Tooltip>
                <Switch onClick={()=>setToggle(!toggle)}/>
                <IconButton>
                  <AccountCircleIcon
                    aria-label="account of current user"
                    aria-controls="menu-account"
                    aria-haspopup="true"
                    sx={{ color: '#fff' }}
                  />
                </IconButton>
              </form>
            </nav>
          </header>
          <div>
            <Router>
              <Routes>
                <Route exact path="/settings" element={<Settings/>} />
                <Route exact path="/profile" element={<UserProfile />} />
                <Route exact path="/dashboard" element={<Dashboard/>} />
                <Route exact path="/terms" element={<Dashboard />} />
              </Routes>
            </Router>
            <main className="Main-app">
              <section className="Section-app">
                <UserProfile toggle={toggle}/>
                <Dashboard toggle={toggle}/>
                <Settings toggle={toggle}/>
                <Dashboard toggle={toggle}/>
              </section>
            </main>
            <Footer toggle={toggle}/>
          </div>
        </div>
      </div>
    );
  }
 
  export default App
