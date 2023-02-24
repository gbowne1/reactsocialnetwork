import React from 'react';
//import { NavLink as Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import '../assets/SideNav.css';
import PropTypes from 'prop-types';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const SideNav = ({isSideNavVisible}) => {
  return (
    <Menu isOpen={isSideNavVisible}>
      <a className="menu-item" href="/groups">
        <GroupsIcon className="side-nav-icon" />
        Groups 
      </a>
      <a className="menu-item" href="/events">
        <CalendarMonthIcon className="side-nav-icon" />
        Events
      </a>
      <a className="menu-item" href="/friends">
      <PeopleAltIcon className="side-nav-icon" />
        Friends
      </a>
    </Menu>
  );
  
}

SideNav.propTypes = {
  isSideNavVisible: PropTypes.bool,
 };

export default SideNav;
