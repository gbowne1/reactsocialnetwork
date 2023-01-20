import React from 'react';
import '../assets/Modal.css';

class Modal extends React.Component {
  render() {
    return (
      <div className="Modal" id="" tabIndex="-1">
        <div className="Modal-content">
          <div className="Modal-header">
            <div className="Modal-title">
              <div className="Modal-body">
                <div className="container-fluid">Modal</div>
                <div className="row">Modal</div>
                <div className="col">Modal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
