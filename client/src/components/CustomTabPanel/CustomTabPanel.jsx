import React from "react";
import { Box, Button, Tabs, Tab, Typography } from "@mui/material";

const CustomTabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography align="left">{children}</Typography>
                </Box>
            )}
        </div>
    );
};

export default CustomTabPanel;
