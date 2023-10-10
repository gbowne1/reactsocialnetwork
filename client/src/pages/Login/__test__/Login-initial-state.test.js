import { fireEvent, render, screen } from "@testing-library/react";

import Login from "../Login";

describe("Tests Login form is correctly displayed", () => {
    it("should render login form elements", () => {
        render(<Login />);

        const loginForm = screen.getByTestId("form");

        const usernameInput = screen.getByTestId("username");
        const usernameLabel = screen.getByLabelText(/Username/i);

        const emailInput = screen.getByTestId("email");
        const emailLabel = screen.getByLabelText(/Email/i);

        const passwordInput = screen.getByTestId("password");
        const passwordLabel = screen.getByLabelText(/Password/i);

        const loginButton = screen.getByTestId("submit");
        const registerHereText = screen.getByText(/Register here!/i);

        expect(loginForm).toBeVisible();

        expect(usernameInput).toBeVisible();
        expect(usernameLabel).toBeVisible();
        expect(screen.getByPlaceholderText(/Enter username/i)).toBeVisible();

        expect(emailInput).toBeVisible();
        expect(emailLabel).toBeVisible();
        expect(screen.getByPlaceholderText(/Enter email/i)).toBeVisible();

        expect(passwordInput).toBeVisible();
        expect(passwordLabel).toBeVisible();
        expect(screen.getByPlaceholderText(/Enter password/i)).toBeVisible();

        expect(loginButton).toBeVisible();

        expect(registerHereText).toBeVisible();
        expect(screen.getByText(/Remember me/i)).toBeVisible();
    });
});

describe("Tests Login form correct initial state", () => {
    it("should have correct initial state for all elements", () => {
        render(<Login />);

        const usernameInput = screen.getByTestId("username");
        const emailInput = screen.getByTestId("email");
        const passwordInput = screen.getByTestId("password");

        expect(usernameInput).toHaveValue("");
        expect(emailInput).toHaveValue("");
        expect(passwordInput).toHaveValue("");

        expect(screen.getAllByRole("checkbox")[1]).toBeChecked();
    });
});

describe("Tests Login form inputs update values correctly", () => {
    it("should have updated username value after user input", () => {
        render(<Login />);

        const usernameInput = screen.getByTestId("username");
        fireEvent.change(usernameInput, { target: { value: "Manuel" } });
        expect(usernameInput.value).toBe("Manuel");
    });

    it("should have updated email value after user input", () => {
        render(<Login />);

        const emailInput = screen.getByTestId("email");
        fireEvent.change(emailInput, { target: { value: "manuel@gmail.com" } });
        expect(emailInput.value).toBe("manuel@gmail.com");
    });

    it("should have updated password value after user input", () => {
        render(<Login />);

        const passwordInput = screen.getByTestId("password");
        fireEvent.change(passwordInput, { target: { value: "12345678!?" } });
        expect(passwordInput.value).toBe("12345678!?");
    });
});
