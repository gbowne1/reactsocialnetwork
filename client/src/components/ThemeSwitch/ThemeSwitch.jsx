import PropTypes from "prop-types";
import { Switch, FormControlLabel } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import "./ThemeSwitch.css";

const ThemeSwitch = ({ handleThemeModeChange, themeMode }) => {
    const isDarkMode = themeMode === "dark";
    const handleChange = (event) => {
        handleThemeModeChange(event.target.checked ? "dark" : "light");
    };
    return (
        <div id="theme-mode-switch" className={`ThemeSwitch ${themeMode}`}>
            <FormControlLabel
                control={
                    <Switch
                        checked={isDarkMode}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "Toggle theme" }}
                    />
                }
                label={themeMode === "dark" ? <DarkMode /> : <LightMode />} // Use labels for better accessibility
            />
        </div>
    );
};

ThemeSwitch.propTypes = {
    themeMode: PropTypes.oneOf(["light", "dark"]),
    handleThemeModeChange: PropTypes.func.isRequired,
};

export default ThemeSwitch;
