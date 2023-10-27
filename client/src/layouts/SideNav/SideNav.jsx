import "./SideNav.css";
//import { NavLink as Link } from 'react-router-dom';
import { slide as Menu } from "react-burger-menu";
import PropTypes from "prop-types";
import GroupsIcon from "@mui/icons-material/Groups";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const SideNav = ({ isSideNavVisible, themeMode }) => {
    return (
        <Menu
            isOpen={isSideNavVisible}
            className={`SideNav ${themeMode}`}
            data-testid="side-nav"
        >
            <a className={`SideNav ${themeMode}`} href="/groups">
                <GroupsIcon className="SideNav__icon" />
                Groups
            </a>
            <a className={`SideNav ${themeMode}`} href="/events">
                <CalendarMonthIcon className="SideNav__icon" />
                Events
            </a>
            <a className={`SideNav ${themeMode}`} href="/friends">
                <PeopleAltIcon className="SideNav__icon" />
                Friends
            </a>
            <a className={`SideNav ${themeMode}`} href="/admin">
                <AdminPanelSettingsIcon className="SideNav__icon" />
                Admin
            </a>
        </Menu>
    );
};

SideNav.propTypes = {
    isSideNavVisible: PropTypes.bool,
    themeMode: PropTypes.string,
};

export default SideNav;
