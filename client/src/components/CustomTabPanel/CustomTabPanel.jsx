import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

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

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    value: PropTypes.number,
    index: PropTypes.number,
};

export default CustomTabPanel;
