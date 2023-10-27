import "./Register.css";
import React from "react";

class Register extends React.Component {
    render() {
        return (
            <form>
                <h2>Register</h2>
                <input
                    type="text"
                    className="Register-input"
                    placeholder="username"
                    required
                >
                    User Name
                </input>
                <input
                    type="password"
                    className="Register-input"
                    placeholder="password"
                    required
                >
                    Password
                </input>
                <input
                    type="password"
                    className="Register-input"
                    placeholder="password"
                    required
                >
                    Password Confirmation
                </input>
                <button
                    type="submit"
                    className="Register-button"
                    onClick="handleSubmit"
                >
                    Register
                </button>
            </form>
        );
    }
}

export default Register;
