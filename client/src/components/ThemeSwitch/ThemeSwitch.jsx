import "./ThemeSwitch.css";
import PropTypes from "prop-types";
import { Switch } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";

const ThemeSwitch = ({ handleThemeModeChange, themeMode }) => {
    return (
        <div id="theme-mode-switch" className={`ThemeSwitch ${themeMode}`}>
            <LightMode />

            <Switch
                onClick={() => handleThemeModeChange()}
                inputProps={{ "aria-label": "Toggle theme" }}
            />
            <DarkMode />
        </div>
    );
};

ThemeSwitch.propTypes = {
    themeMode: PropTypes.string,
    handleThemeModeChange: PropTypes.func,
};

export default ThemeSwitch;
