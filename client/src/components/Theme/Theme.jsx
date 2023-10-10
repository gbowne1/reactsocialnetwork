import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        type: "dark",
        palette: {
            type: "light",
        },
    },
});

export const lightTheme = {
    body: "#FFF",
    text: "#363537",
    themeModeBorder: "#FFF",
    background: "#363537",
    color: "#e5e5e5",
};
export const darkTheme = {
    body: "#363537",
    text: "#FAFAFA",
    themeModeBorder: "#6B8096",
    background: "#999",
    /* background-color: '#15181f', */
    color: "#e5e5e5",
};

export default theme;
