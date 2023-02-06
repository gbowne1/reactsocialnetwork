import React from 'react';
import { NavLink as Link } from 'react-router-dom';
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
      <div className="Side-navigation" id="">
        <div className="container-fluid">
          <Link to="/"></Link>
          <Link to="/groups">
          <button className='button'>Groups</button>
          </Link>
          <Link to="/events">
          <button className='button'>Events</button>
          </Link>
          <Link to="/friends">
            <button className='button'>Friends</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default SideNav;
