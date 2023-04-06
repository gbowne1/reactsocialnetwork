import React, { useState } from "react";
import PropTypes from "prop-types";
import CloseButton from "../../components/CloseButton/CloseButton";
import "./Dashboard.css";

function Dashboard({ themeMode }) {
  const [isOpen, setIsOpen] = useState(true);

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <div className={`Dashboard ${themeMode}`}>
          <div className={`Dashboard-header ${themeMode}`}>
            <h3 className="Dashboard-title">Dashboard</h3>
            <CloseButton handleClose={handleClose} />
          </div>
          <section className={`Dashboard-content ${themeMode}`}></section>
          <h4>Welcome to your dashboard!</h4>
        </div>
      )}
    </>
  );
}
Dashboard.propTypes = {
  themeMode: PropTypes.string,
};

export default Dashboard;
