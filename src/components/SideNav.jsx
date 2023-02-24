import React from 'react';
//import { NavLink as Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import '../assets/SideNav.css';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
  }

  render() {
    return (
      <Menu>
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
}

export default SideNav;
