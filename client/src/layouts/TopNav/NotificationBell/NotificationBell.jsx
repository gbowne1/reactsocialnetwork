import PropTypes from "prop-types";

import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationBell = ({ notifications, setOpen }) => {
    const newNotifications = `You have ${notifications.length} notifications!`;
    const noNewNotifications = "No new notifications";

    const handleOpen = () => {
        setOpen && setOpen(true);
    };

    return (
        <Tooltip
            title={notifications.length ? newNotifications : noNewNotifications}
        >
            <IconButton
                data-testid="notification-bell"
                size="large"
                color="inherit"
                aria-label={`show ${notifications.length} new notifications`}
                onClick={notifications.length ? handleOpen : null}
            >
                <Badge badgeContent={notifications.length} color="error">
                    <NotificationsIcon color="inherit" />
                </Badge>
            </IconButton>
        </Tooltip>
    );
};

export default NotificationBell;

NotificationBell.propTypes = {
    notifications: PropTypes.array,
    setOpen: PropTypes.func,
    iconColor: PropTypes.string,
};
