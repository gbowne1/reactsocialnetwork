import React, { useState } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Collapse, ListSubheader } from "@mui/material";
import { ExpandLess, ExpandMore} from "@mui/icons-material";
import helpCenterContentCategories from "../../data/json/helpCenterContentCategories.json";
import "./HelpCenter.css";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { NavLink, Outlet } from "react-router-dom";

const HelpCenter = ({themeMode}) => {

    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const helpCenterCategories = helpCenterContentCategories.map(category => {

        const {categoryName, categoryId, subcategories} = category;

        return (
            <Box 
                sx={{display: "flex", flexDirection: "column"}}
                key={categoryId}
            >
                <ListItemButton onClick={handleClick}>
                    <ListItemText primary={categoryName} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding  sx={{display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                            {subcategories.map(subcategory => {
                                
                                const {subcategoryName, subcategoryId} = subcategory;
                                
                                return (
                                    <NavLink
                                        className="Help-center__subcategory-link"
                                        key={categoryId+subcategoryId}
                                        to={`/help/${categoryId}/${subcategoryId}`}
                                    >
                                        <ListItemButton
                                            key={subcategoryId}
                                            sx={{ pl: 4, width: "100%" }}
                                        >
                                            <ListItemText primary={subcategoryName}/>
                                        </ListItemButton>
                                    </NavLink>
                                )
                                        
                            })}
                    </List>
                </Collapse>
            </Box>
        )

    }) 
    return (
        <div className={`Help-center ${themeMode}`}>
            <div className={`Help-center__header ${themeMode}`}>
                <h3>Help center</h3>
            </div>
            <div className="Help-center__content-wrapper">
                <div className="Help-center__subject-picker">
                    <List
                        className={`Help-center__categories-list ${themeMode}`}
                        component="nav"
                        aria-labelledby="Help-center__categories-subheader"
                        subheader={
                            <ListSubheader 
                            component="div" 
                            id="Help-center__categories-subheader"
                            className={`Help-center__categories-subheader ${themeMode}`}
                            >
                                Categories
                            </ListSubheader>
                        }
                        >
                    {helpCenterCategories}
                    </List>
                </div>
                <div className="Help-center__subject-details">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

HelpCenter.propTypes = {
    themeMode: PropTypes.string,
  };

export default HelpCenter