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
import Terms from "./components/Terms";
import SideNav from "./components/SideNav";
import Post from "./components/Post";
import TopNav from "./components/TopNav";
import Login from "./components/Login";

import { loadFromLocalStorage } from "./utils";
// import IconButton from '@mui/material/IconButton';
// import NotFound from './pages/NotFound';
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const lastLoginCredentials = loadFromLocalStorage("lastLoginCredentials");
  const [loginToken, setLoginToken] = useState(lastLoginCredentials);
  const [toggle, setToggle] = useState(true);
  const theme = toggle ? "light-mode" : "dark-mode";
  const [isSideNavVisible, setIsSideNavVisible] = useState(false);

  if (!loginToken) {
    return (
      <div className={`App ${theme}`}>
        <Login
          setLoginToken={setLoginToken}
          toggle={toggle}
          setToggle={setToggle}
        />
      </div>
    );
  }

  return (
    <div className={`App ${theme}`}>
      <div className="container-fluid">
        <header className="App-header">
          <TopNav
            setToggle={setToggle}
            toggle={toggle}
            setIsSideNavVisible={setIsSideNavVisible}
            isSideNavVisible={isSideNavVisible}
          />
        </header>

        <div className={`Main-app-container ${theme}`}>
          <SideNav isSideNavVisible={isSideNavVisible} toggle={toggle} />
          <main className={`Main-app ${theme}`}>
            <section className={`Section-app ${theme}`}>
              <Router>
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={<Dashboard toggle={toggle} />}
                  />
                  <Route
                    exact
                    path="/dashboard"
                    element={<Dashboard toggle={toggle} />}
                  />
                  <Route
                    exact
                    path="/settings"
                    element={<Settings toggle={toggle} />}
                  />
                  <Route
                    exact
                    path="/user-profile"
                    element={<UserProfile toggle={toggle} />}
                  />
                  <Route
                    exact
                    path="/friends"
                    element={<Friends toggle={toggle} />}
                  />
                  <Route
                    exact
                    path="/profile"
                    element={<Profile toggle={toggle} />}
                  />
                  <Route
                    exact
                    path="/post"
                    element={<Post toggle={toggle} />}
                  />
                  <Route
                    exact
                    path="/terms"
                    element={<Terms toggle={toggle} />}
                  />
                  <Route
                    exact
                    path="*"
                    element={<NotFound toggle={toggle} />}
                  />
                </Routes>
              </Router>
            </section>
          </main>
          <Footer toggle={toggle} />
        </div>
      </div>
    </div>
  );
};

export default App;
