import { useState } from "react";
import PropTypes from "prop-types";
import Panel from "../../components/Panel/Panel";

import "./Dashboard.css";

function Dashboard({ themeMode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <Panel
          themeMode={themeMode}
          titleHeading="Dashboard"
          contentHeading="Welcome to your dashboard!"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        ></Panel>
      )}
    </>
  );
}
Dashboard.propTypes = {
  themeMode: PropTypes.string,
};

export default Dashboard;
