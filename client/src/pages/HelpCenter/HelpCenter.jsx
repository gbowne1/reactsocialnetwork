import "./HelpCenter.css";
import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Collapse, ListSubheader } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import helpCenterContentCategories from "../../data/json/helpCenterContentCategories.json";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { NavLink, Outlet } from "react-router-dom";

import Panel from "../../components/Panel/Panel";

const HelpCenter = ({ themeMode }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const helpCenterCategories = helpCenterContentCategories.map((category) => {
        const { categoryName, categoryId, subcategories } = category;

        return (
            <Box
                sx={{ display: "flex", flexDirection: "column" }}
                key={categoryId}
            >
                <ListItemButton onClick={handleClick}>
                    <ListItemText primary={categoryName} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List
                        component="div"
                        disablePadding
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        {subcategories.map((subcategory) => {
                            const { subcategoryName, subcategoryId } =
                                subcategory;

                            return (
                                <NavLink
                                    className="HelpCenter__subcategory-link"
                                    key={categoryId + subcategoryId}
                                    to={`/help/${categoryId}/${subcategoryId}`}
                                >
                                    <ListItemButton
                                        key={subcategoryId}
                                        sx={{ pl: 4, width: "100%" }}
                                    >
                                        <ListItemText
                                            primary={subcategoryName}
                                        />
                                    </ListItemButton>
                                </NavLink>
                            );
                        })}
                    </List>
                </Collapse>
            </Box>
        );
    });
    return (
        <Panel
            themeMode={themeMode}
            width={75}
            titleHeading="Help center"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            dataTestId={"help-panel"}
        >
            <div className="HelpCenter__content-wrapper">
                <div className="HelpCenter__subject-picker">
                    <List
                        className={`HelpCenter__categories-list ${themeMode}`}
                        component="nav"
                        aria-labelledby="HelpCenter__categories-subheader"
                        subheader={
                            <ListSubheader
                                component="div"
                                id="HelpCenter__categories-subheader"
                                className={`HelpCenter__categories-subheader ${themeMode}`}
                            >
                                Categories
                            </ListSubheader>
                        }
                    >
                        {helpCenterCategories}
                    </List>
                </div>
                <div className="HelpCenter__subject-details">
                    <Outlet />
                </div>
            </div>
        </Panel>
    );
};

HelpCenter.propTypes = {
    themeMode: PropTypes.string,
};

export default HelpCenter;
