import React from 'react';
//import { NavLink as Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import './SideNav.css';
import PropTypes from 'prop-types';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const SideNav = ({isSideNavVisible, themeMode}) => {

  return (
    <Menu isOpen={isSideNavVisible} className={`${themeMode}`}>
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
    </Menu>
  );
  
}

SideNav.propTypes = {
  isSideNavVisible: PropTypes.bool,
  themeMode: PropTypes.string,
 };

export default SideNav;
