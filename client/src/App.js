import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
// import MenuIcon from '@mui/icons-material/Menu';
import Timeline from "./pages/Timeline/Timeline";
import UserProfile from "./pages/UserProfile/UserProfile";
import Profile from "./pages/Profile/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings from "./pages/Settings/Settings";
import Friends from "./pages/Friends/Friends";
import Events from "./pages/Events/Events";
import Footer from "./layouts/Footer/Footer";
import NotFound from "./pages/NotFound/NotFound";
import Terms from "./pages/Terms/Terms";
import SideNav from "./layouts/SideNav/SideNav";
import Post from "./pages/Post/Post";
import TopNav from "./layouts/TopNav/TopNav";
import Login from "./pages/Login/Login";
import HelpCenter from "./pages/HelpCenter/HelpCenter";
import SubjectDetails from "./pages/HelpCenter/SubjectDetails";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";

import getFromLocalStorage from "./utils/getFromLocalStorage";
import Feedback from "./pages/Feedback/Feedback";
import saveToLocalStorage from "./utils/saveToLocalStorage";
import helpCenterContentCategories from "./data/json/helpCenterContentCategories.json";

const App = () => {
    const lastLoginCredentials = getFromLocalStorage("lastLoginCredentials");
    const [loginToken, setLoginToken] = useState(lastLoginCredentials);
    const [themeMode, setThemeMode] = useState(
        getFromLocalStorage("isThemeLightMode") ||
            (() => {
                saveToLocalStorage("isThemeLightMode", "light-mode");
                return getFromLocalStorage("isThemeLightMode");
            })
    );
    const [isSideNavVisible, setIsSideNavVisible] = useState(false);

    const handleThemeModeChange = () => {
        const newTheme =
            themeMode === "light-mode" ? "dark-mode" : "light-mode";
        saveToLocalStorage("isThemeLightMode", newTheme);
        setThemeMode(newTheme);
    };

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
        <div className={`App ${themeMode}`} data-testid="app">
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
                        <SideNav
                            isSideNavVisible={isSideNavVisible}
                            themeMode={themeMode}
                        />
                        <main className={`Main-app ${themeMode}`}>
                            <section className={`Section-app ${themeMode}`}>
                                <Routes>
                                    <Route
                                        exact
                                        path="/"
                                        element={
                                            <Timeline themeMode={themeMode} />
                                        }
                                    />
                                    <Route
                                        exact
                                        path="/dashboard"
                                        element={
                                            <Dashboard themeMode={themeMode} />
                                        }
                                    />
                                    <Route
                                        exact
                                        path="/settings"
                                        element={
                                            <Settings themeMode={themeMode} />
                                        }
                                    />
                                    <Route
                                        exact
                                        path="/user-profile"
                                        element={
                                            <UserProfile
                                                themeMode={themeMode}
                                            />
                                        }
                                    />
                                    <Route
                                        exact
                                        path="/friends"
                                        element={
                                            <Friends themeMode={themeMode} />
                                        }
                                    />
                                    <Route
                                        exact
                                        path="/events"
                                        element={
                                            <Events themeMode={themeMode} />
                                        }
                                    />
                                    <Route
                                        exact
                                        path="/profile"
                                        element={
                                            <Profile themeMode={themeMode} />
                                        }
                                    />
                                    <Route
                                        exact
                                        path="/post"
                                        element={<Post themeMode={themeMode} />}
                                    />
                                    <Route
                                        exact
                                        path="/terms"
                                        element={
                                            <Terms themeMode={themeMode} />
                                        }
                                    />
                                    <Route
                                        exact
                                        path="/feedback"
                                        element={
                                            <Feedback themeMode={themeMode} />
                                        }
                                    />
                                    <Route
                                        exact
                                        path="/help"
                                        element={
                                            <HelpCenter themeMode={themeMode} />
                                        }
                                    >
                                        {helpCenterContentCategories.map(
                                            (category) => {
                                                const {
                                                    categoryId,
                                                    subcategories,
                                                } = category;

                                                return subcategories.map(
                                                    (subcategory) => {
                                                        const {
                                                            subcategoryId,
                                                            header,
                                                            content,
                                                        } = subcategory;

                                                        return (
                                                            <Route
                                                                key={`url-${categoryId}-${subcategoryId}`}
                                                                path={`${categoryId}/${subcategoryId}`}
                                                                element={
                                                                    <SubjectDetails
                                                                        header={
                                                                            header
                                                                        }
                                                                        content={
                                                                            content
                                                                        }
                                                                    />
                                                                }
                                                            />
                                                        );
                                                    }
                                                );
                                            }
                                        )}
                                    </Route>
                                    <Route
                                        exact
                                        path="/admin"
                                        element={
                                            <AdminDashboard
                                                themeMode={themeMode}
                                            />
                                        }
                                    />
                                    <Route
                                        exact
                                        path="*"
                                        element={
                                            <NotFound themeMode={themeMode} />
                                        }
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
