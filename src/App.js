import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import UserProfile from "./components/UserProfile";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import Friends from "./components/Friends"
import Events from "./components/Events";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Terms from "./components/Terms";
import SideNav from "./components/SideNav";
import Post from "./components/Post";
import TopNav from "./components/TopNav";
import Login from "./components/Login";

import { loadFromLocalStorage, saveToLocalStorage } from "./utils";
import getFromLocalStorage from "./helpers/getFromLocalStorage";
import Feedback from "./components/Feedback";
import HelpCenter from "./components/HelpCenter";
import helpCenterContentCategories from "./data/json/helpCenterContentCategories.json";

const App = () => {
  const lastLoginCredentials = loadFromLocalStorage("lastLoginCredentials");
  const [loginToken, setLoginToken] = useState(lastLoginCredentials);
  const [themeMode, setThemeMode] = useState(
    getFromLocalStorage("isThemeLightMode") ||
    (() => {
      saveToLocalStorage("isThemeLightMode", "light-mode");
      return getFromLocalStorage("isThemeLightMode");
    }
  ));
  const [isSideNavVisible, setIsSideNavVisible] = useState(false);

  const handleThemeModeChange = () => {
    const newTheme = themeMode === "light-mode" ? "dark-mode" : "light-mode";
    saveToLocalStorage("isThemeLightMode", newTheme);
    setThemeMode(newTheme)
  }

  if (!loginToken) {
    return (
      <div className={`App ${themeMode}`}>
        <Login
          setLoginToken={setLoginToken}
          themeMode={themeMode}
          handleThemeModeChange={handleThemeModeChange}
        />
      </div>
    );
  }

  return (
    <div className={`App ${themeMode}`}>
      <Router>
        <div className="container-fluid">
          <header className="App-header">
            <TopNav
              handleThemeModeChange={handleThemeModeChange}
              themeMode={themeMode}
              setIsSideNavVisible={setIsSideNavVisible}
              isSideNavVisible={isSideNavVisible}
            />
          </header>

          <div className={`Main-app-container ${themeMode}`}>
            <SideNav isSideNavVisible={isSideNavVisible} themeMode={themeMode} />
            <main className={`Main-app ${themeMode}`}>
              <section className={`Section-app ${themeMode}`}>
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={<Dashboard themeMode={themeMode} />}
                  />
                  <Route
                    exact
                    path="/dashboard"
                    element={<Dashboard themeMode={themeMode} />}
                  />
                  <Route
                    exact
                    path="/settings"
                    element={<Settings themeMode={themeMode} />}
                  />
                  <Route
                    exact
                    path="/user-profile"
                    element={<UserProfile themeMode={themeMode} />}
                  />
                  <Route
                    exact
                    path="/friends"
                    element={<Friends themeMode={themeMode} />}
                  />
                  <Route
                    exact
                    path="/events"
                    element={<Events themeMode={themeMode} />}
                  />
                  <Route
                    exact
                    path="/profile"
                    element={<Profile themeMode={themeMode} />}
                  />
                  <Route
                    exact
                    path="/post"
                    element={<Post themeMode={themeMode} />}
                  />
                  <Route
                    exact
                    path="/terms"
                    element={<Terms themeMode={themeMode} />}
                  />
                  <Route
                    exact
                    path="/feedback"
                    element={<Feedback themeMode={themeMode} />}
                  />
                  <Route
                      exact
                      path="/help"
                      element={<HelpCenter themeMode={themeMode} />}
                  >
                    {
                      helpCenterContentCategories.map(category => {
                        const {categoryId, subcategories} = category;

                          return subcategories.map(subcategory => {

                            const {subcategoryId} = subcategory;
                            
                            console.log(`${categoryId}/${subcategoryId}`)
                            return (
                              <Route 
                                  key={`url-${categoryId}-${subcategoryId}`}
                                  path={`${categoryId}/${subcategoryId}`}
                                  element={<h1>{subcategoryId}</h1>}
                              />

                            )

                          })
                      })
                    }

                  </Route>
                  <Route
                    exact
                    path="*"
                    element={<NotFound themeMode={themeMode} />}
                  />
                </Routes>
              </section>
            </main>
            <Footer themeMode={themeMode} />
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
