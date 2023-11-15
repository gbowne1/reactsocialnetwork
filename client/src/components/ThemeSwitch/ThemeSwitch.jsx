import PropTypes from "prop-types";
import { Switch } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import "./ThemeSwitch.css";

const ThemeSwitch = ({ handleThemeModeChange, themeMode }) => {
    return (
        <div id="theme-mode-switch" className={`ThemeSwitch ${themeMode}`}>
            <DarkMode />
            <Switch
                onClick={() => handleThemeModeChange()}
                inputProps={{ "aria-label": "Toggle theme" }}
            />
            <LightMode />
        </div>
    );
};

ThemeSwitch.propTypes = {
    themeMode: PropTypes.string,
    handleThemeModeChange: PropTypes.func,
};

export default ThemeSwitch;
