import "./Admin.Dashboard.css";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material/";
import Panel from "../../components/Panel/Panel";

function AdminDashboard({ themeMode }) {
    const [isOpen, setIsOpen] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from db
        fetch("http://localhost:9000/api/users")
            .then((res) => res.json())
            .then((res) => {
                setUsers(res.data);
            });
    }, []);

    return (
        <>
            {isOpen && (
                <Panel
                    themeMode={themeMode}
                    titleHeading="Admin Dashboard"
                    contentHeading="Welcome to your Admin Dashboard!"
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                >
                    <Button
                        size="small"
                        variant="contained"
                        sx={{
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                        }}
                    >
                        New Button
                    </Button>
                </Panel>
            )}
        </>
    );
}
AdminDashboard.propTypes = {
    themeMode: PropTypes.string,
};

export default AdminDashboard;
