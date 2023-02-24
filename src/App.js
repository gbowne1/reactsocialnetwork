import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
// import MenuIcon from '@mui/icons-material/Menu';
import UserProfile from "./components/UserProfile";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import Friends from "./components/Friends";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import SideNav from "./components/SideNav";
import Post from "./components/Post"
import TopNav from "./components/TopNav";
// import IconButton from '@mui/material/IconButton';
// import Login from "./components/Login";
// import NotFound from './pages/NotFound';
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const App = () => {

  const [toggle, setToggle] = useState(false);
  const [isSideNavVisible, setIsSideNavVisible] = useState(false);

  return (
    <div className="App">
      <div className="container-fluid">

        <header className="App-header">
          <TopNav 
            setToggle={setToggle} 
            toggle={toggle} 
            setIsSideNavVisible={setIsSideNavVisible} 
            isSideNavVisible={isSideNavVisible}
          />
        </header>

        <div className="Main-app-container">
          <Router>
            <Routes>
              <Route exact path="/settings" element={<Settings />} />
              <Route exact path="/profile" element={<UserProfile />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/terms" element={<NotFound />} />
              <Route path="*" element={<SideNav isSideNavVisible={isSideNavVisible} />} />
            </Routes>
          </Router>
          <main className="Main-app">
            <section className="Section-app">
              <UserProfile toggle={toggle} />
              <Dashboard toggle={toggle} />
              <Friends toggle={toggle} />
              <Profile toggle={toggle} />
              <Settings toggle={toggle} />
              <Post toggle={toggle} />
            </section>
          </main>
          <Footer toggle={toggle} />
        </div>
      </div>
    </div>
  );
};

export default App;
