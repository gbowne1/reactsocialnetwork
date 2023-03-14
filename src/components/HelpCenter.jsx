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

const HelpCenter = () => {

    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
      };

    return (
        <div className="Help-center">
            <div className="Help-center__subject-picker">
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                        Nested List Items
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

export default HelpCenter