import React from 'react';
//import { NavLink as Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import '../assets/SideNav.css';
import PropTypes from 'prop-types';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const SideNav = ({isSideNavVisible, toggle}) => {

  const theme = toggle ? "light-mode" : "dark-mode";

  return (
    <Menu isOpen={isSideNavVisible} className={`${theme}`}>
      <a className={`menu-item ${theme}`} href="/groups">
        <GroupsIcon className="side-nav-icon" />
        Groups 
      </a>
      <a className={`menu-item ${theme}`} href="/events">
        <CalendarMonthIcon className="side-nav-icon" />
        Events
      </a>
      <a className={`menu-item ${theme}`} href="/friends">
      <PeopleAltIcon className="side-nav-icon" />
        Friends
      </a>
    </Menu>
  );
  
}

SideNav.propTypes = {
  isSideNavVisible: PropTypes.bool,
  toggle: PropTypes.bool,
 };

export default SideNav;
