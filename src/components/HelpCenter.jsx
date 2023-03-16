import React, { useState } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Collapse, ListSubheader } from "@mui/material";
import { ExpandLess, ExpandMore, StarBorder} from "@mui/icons-material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import helpCenterContent from "../json/helpCenterContent.json";
import "../assets/HelpCenter.css";
import PropTypes from "prop-types";

const HelpCenter = ({themeMode}) => {

    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
      };

      console.log(helpCenterContent);
      
    return (
        <div className={`Help-center ${themeMode}`}>
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
                            Help Center
                        </ListSubheader>
                    }
                >
                    <ListItemButton>
                        <ListItemIcon>
                        <SendIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sent mail" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                        <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Drafts" />
                    </ListItemButton>
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                        <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                            <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </div>
            <div className="Help-center__subject-details">
                
            </div>
        </div>
    );
}

HelpCenter.propTypes = {
    themeMode: PropTypes.string,
  };

export default HelpCenter