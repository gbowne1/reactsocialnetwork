//import { NavLink as Link } from 'react-router-dom';
import { slide as Menu } from "react-burger-menu";
import "./SideNav.css";
import PropTypes from "prop-types";
import GroupsIcon from "@mui/icons-material/Groups";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const SideNav = ({ isSideNavVisible, themeMode }) => {
  return (
    <Menu
      isOpen={isSideNavVisible}
      className={`${themeMode}`}
      data-testid="side-nav"
    >
      <a className={`menu-item ${themeMode}`} href="/groups">
        <GroupsIcon className="side-nav-icon" />
        Groups
      </a>
      <a className={`menu-item ${themeMode}`} href="/events">
        <CalendarMonthIcon className="side-nav-icon" />
        Events
      </a>
      <a className={`menu-item ${themeMode}`} href="/friends">
        <PeopleAltIcon className="side-nav-icon" />
        Friends
      </a>
      <a className={`menu-item ${themeMode}`} href="/admin">
        <AdminPanelSettingsIcon className="side-nav-icon" />
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
