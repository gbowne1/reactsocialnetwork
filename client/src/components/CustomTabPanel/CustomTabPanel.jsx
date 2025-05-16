import React from "react";
import { Box, Button, Tabs, Tab, Typography } from "@mui/material";

const CustomTabPanel = ({ children, value, index, onTabChange }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography align="left">{children}</Typography>

                    {/* Example of adding Tabs & a Button */}
                    <Tabs value={value} onChange={onTabChange}>
                        <Tab label="Tab 1" />
                        <Tab label="Tab 2" />
                    </Tabs>

                    <Button variant="contained" color="primary">
                        Click Me
                    </Button>
                </Box>
            )}
        </div>
    );
};

export default CustomTabPanel;
