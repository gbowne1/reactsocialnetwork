import React, { Fragment } from 'react';
import '../assets/NotFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <>
        <span>
          <i className="fa fa-chain-broken fa-5"></i>
        </span>
        <h2>
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </h2>
        <h1>Oops! We&apos;re sorry. We couldn&apos;t find your page.</h1>
        <span>
          <button id="button" value="abc">
            Go Back
          </button>
        </span>
        <script src="./404.js"></script>
      </>
    );
  }
}

export default NotFound;
