import React from 'react';
//import { NavLink as Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import '../assets/SideNav.css';

class SideNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
  }

  /* openNav = () => {
      document.getElementById('Side-navigation').style.width = '250px';
      document.getElementById('main').style.left = '250px';
    }
  };*/
  
  /* closeNav = () => {
    document.getElementById('Side-navigation').style.width = '0';
    document.getElementById('main').style.left = '0';
  };

  /* const [show, setShow] = useState(); */

  render() {
    return (
      <Menu>
          <a className="menu-item" href="/groups">
          Groups 
          </a>
          <a className="menu-item" href="/events">
          Event
        </a>

        <a className="menu-item" href="/friends">
          Friends
        </a>
        
      
      </Menu>

      
    );
  }
}

export default SideNav;
