import React, { useState } from "react";
import PropTypes from "prop-types";
import CloseButton from "./CloseButton";
import "../assets/Dashboard.css";

function Dashboard({ toggle }) {
  const [isOpen, setIsOpen] = useState(true);

  const theme = toggle ? "light-mode" : "dark-mode";

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <div className={`Dashboard ${theme}`}>
          <div className={`Dashboard-header ${theme}`}>
            <h3 className="Dashboard-title">Dashboard</h3>
            <CloseButton handleClose={handleClose} />
          </div>
          <section className={`Dashboard-content ${theme}`}></section>
          <h4>Welcome to your dashboard!</h4>
        </div>
      )}
    </>
  );
}
Dashboard.propTypes = {
  toggle: PropTypes.bool,
};

export default Dashboard;
