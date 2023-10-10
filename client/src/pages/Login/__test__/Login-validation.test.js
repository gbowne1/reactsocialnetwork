import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Login from "../Login";
const user = userEvent.setup();

describe("Tests Login form input validation", () => {
    it("should display error label when leaving username empty", async () => {
        render(<Login />);

        const loginButton = screen.getByText(/LOGIN/i);
        fireEvent.click(loginButton);

        const helperText = await screen.findByText(
            "Username is a required field"
        );
        expect(helperText).toBeVisible();
    });

    it("should display error label when inputing an username with less than 6 characters", async () => {
        act(() => {
            render(<Login />);
        });

        const usernameInput = screen.getByTestId("username");
        const loginButton = screen.getByText(/LOGIN/i);

        await act(async () => {
            await user.type(usernameInput, "ABCDE");
            expect(usernameInput.value).toBe("ABCDE");

            await user.click(loginButton);
        });

        const helperText = document.querySelector("#username-helper-text");
        expect(helperText).toHaveTextContent(
            "Username must be at least 6 characters"
        );
    });

    it("should display error label when leaving email empty", async () => {
        render(<Login />);

        const loginButton = screen.getByText(/LOGIN/i);
        fireEvent.click(loginButton);

        const helperText = await screen.findByText("Email is a required field");
        expect(helperText).toBeVisible();
    });

    it("should display error label when email is not a valid", async () => {
        act(() => {
            render(<Login />);
        });

        const emailInput = screen.getByTestId("email");
        const loginButton = screen.getByText(/LOGIN/i);

        await act(async () => {
            await user.type(emailInput, "notValidEmail");
            expect(emailInput.value).toBe("notValidEmail");
            await user.click(loginButton);
        });
        const helperText = document.querySelector("#email-helper-text");
        expect(helperText).toHaveTextContent("Email must be a valid email");
    });

    it("should display error label if password doens't have at least 8 characters", async () => {
        render(<Login />);

        const loginButton = screen.getByText(/LOGIN/i);
        fireEvent.click(loginButton);

        const helperText = await screen.findByText(
            "password must be at least 8 characters"
        );
        expect(helperText).toBeVisible();
    });

    it("should display error label if password doens't have at least 1 uppercase character", async () => {
        act(() => {
            render(<Login />);
        });

        const passwordInput = screen.getByTestId("password");
        const loginButton = screen.getByText(/LOGIN/i);

        await act(async () => {
            await user.type(passwordInput, "passwordnouppercase");
            expect(passwordInput.value).toBe("passwordnouppercase");

            await user.click(loginButton);
        });
        const helperText = document.querySelector("#password-helper-text");
        expect(helperText).toHaveTextContent(
            "password must contain at least 1 uppercase letter"
        );
    });

    it("should display error label if password doens't have at least 1 lowercase character", async () => {
        act(() => {
            render(<Login />);
        });

        const passwordInput = screen.getByTestId("password");
        const loginButton = screen.getByText(/LOGIN/i);

        await act(async () => {
            await user.type(passwordInput, "PASSWORDNOLOWERCASE");
            expect(passwordInput.value).toBe("PASSWORDNOLOWERCASE");

            await user.click(loginButton);
        });
        const helperText = document.querySelector("#password-helper-text");
        expect(helperText).toHaveTextContent(
            "password must contain at least 1 lowercase letter"
        );
    });

    it("should display error label if password doens't have at least 1 number character", async () => {
        act(() => {
            render(<Login />);
        });

        const passwordInput = screen.getByTestId("password");
        const loginButton = screen.getByText(/LOGIN/i);

        await act(async () => {
            await user.type(passwordInput, "passwordWithNoNumber");
            expect(passwordInput.value).toBe("passwordWithNoNumber");
            await user.click(loginButton);
        });
        const helperText = document.querySelector("#password-helper-text");
        expect(helperText).toHaveTextContent(
            "password must contain at least 1 number"
        );
    });

    it("should display error label if password doens't have at least 1 symbol character", async () => {
        act(() => {
            render(<Login />);
        });

        const passwordInput = screen.getByTestId("password");
        const loginButton = screen.getByText(/LOGIN/i);

        await act(async () => {
            await user.type(passwordInput, "passwordWithNoSymbols1");
            expect(passwordInput.value).toBe("passwordWithNoSymbols1");

            await user.click(loginButton);
        });
        const helperText = document.querySelector("#password-helper-text");
        expect(helperText).toHaveTextContent(
            "password must contain at least 1 symbol"
        );
    });

    it("should update password input to a text input after clicking the 'eye' button", async () => {
        act(() => {
            render(<Login />);
        });

        const passwordInput = screen.getByTestId("password");
        expect(passwordInput.type).toBe("password");

        await act(async () => {
            const showPasswordButton = screen.getByTestId("show-password");
            await user.click(showPasswordButton);
        });

        expect(passwordInput.type).toBe("text");

        await act(async () => {
            const showPasswordButton = screen.getByTestId("show-password");
            await user.click(showPasswordButton);
        });

        expect(passwordInput.type).toBe("password");
    });

    it("should display 'Register here!' text initially", () => {
        render(<Login />);

        const loginRegisterText = screen.getByTestId("loginRegisterSwitch");
        expect(loginRegisterText).toBeVisible();
        expect(loginRegisterText).toHaveTextContent(
            "You don't have an account? Register here!"
        );
    });

    it("should display 'Login here!' text after being clicked", () => {
        render(<Login />);

        const loginRegisterText = screen.getByTestId("loginRegisterSwitch");
        fireEvent.click(loginRegisterText);

        expect(loginRegisterText).toBeVisible();
        expect(loginRegisterText).toHaveTextContent(
            "You already have an account? Login here!"
        );
    });
});
