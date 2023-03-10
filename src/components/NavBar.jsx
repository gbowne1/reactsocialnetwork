import React from 'react';
import '../assets/NavBar.css';

class NavBar extends React.Component {
  handleClick = () => {
    this.setState = { clicked: false };
    this.setState({
      clicked: !this.state.clicked
    });
  };

  render() {
    return (
      <div className="Navigation-header">
        <div className="container-fluid">
          <nav className="Navigation-bar">
            <ul>
              <button onClick={this.handleClick.bind(this)}>
                &#9776; Open
              </button>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default NavBar;
