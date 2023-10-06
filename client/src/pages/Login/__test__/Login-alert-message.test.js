import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Login from "../Login";

const user = userEvent.setup();

const mockSetLoginToken = jest.fn((data) =>
    console.log(`mockSetLoginToken called with ${data}`)
);

describe("Tests Login alert messages", () => {
    it("should display success message on successful login", async () => {
        act(() => {
            render(<Login />);
        });

        const usernameInput = screen.getByTestId("username");
        const emailInput = screen.getByTestId("email");
        const passwordInput = screen.getByTestId("password");
        const loginButton = screen.getByText(/LOGIN/i);

        await act(async () => {
            await user.type(usernameInput, "testuser1");
            expect(usernameInput.value).toBe("testuser1");

            await user.type(emailInput, "testuser@gmail.com");
            expect(emailInput.value).toBe("testuser@gmail.com");

            await user.type(passwordInput, "Testpass1!");
            expect(passwordInput.value).toBe("Testpass1!");

            await user.click(loginButton);
        });

        const alertMessage = screen.getByTestId("alert-message");
        expect(alertMessage).toHaveTextContent("Login successful!");
    });

    it("should display success message on successful register", async () => {
        const newUser = {
            username: "Testuser99",
            email: "testuser99@gmail.com",
            password: "Testuser99!",
        };

        const fakeResponse = { error: null };
        const mockedFetch = jest.spyOn(global, "fetch").mockResolvedValue({
            json: jest.fn().mockResolvedValue(fakeResponse),
        });

        act(() => {
            render(<Login setLoginToken={mockSetLoginToken} />);
        });

        const loginRegisterText = screen.getByTestId("loginRegisterSwitch");
        fireEvent.click(loginRegisterText);

        expect(loginRegisterText).toBeVisible();
        expect(loginRegisterText).toHaveTextContent(
            "You already have an account? Login here!"
        );

        const usernameInput = screen.getByTestId("username");
        const emailInput = screen.getByTestId("email");
        const passwordInput = screen.getByTestId("password");
        const registerButton = screen.getByText(/REGISTER/i);

        await act(async () => {
            await user.type(usernameInput, newUser["username"]);
            expect(usernameInput.value).toBe("Testuser99");

            await user.type(emailInput, newUser["email"]);
            expect(emailInput.value).toBe("testuser99@gmail.com");

            await user.type(passwordInput, newUser["password"]);
            expect(passwordInput.value).toBe("Testuser99!");

            await user.click(registerButton);
        });

        expect(mockedFetch).toHaveBeenCalledTimes(1);

        const alertMessage = screen.getByTestId("alert-message");
        expect(alertMessage).toHaveTextContent("Registered user!");
    });

    it("should display error message on login without existing credentials", async () => {
        const nonExistingUser = {
            username: "nonExistingUser",
            email: "nonExistingEmail@gmail.com",
            password: "nonExistingPassword1!",
        };

        const fakeResponse = {
            error: true,
        };
        const mockedFetch = jest.spyOn(global, "fetch").mockResolvedValue({
            json: jest.fn().mockResolvedValue(fakeResponse),
        });

        act(() => {
            render(<Login setLoginToken={mockSetLoginToken} />);
        });

        const usernameInput = screen.getByTestId("username");
        const emailInput = screen.getByTestId("email");
        const passwordInput = screen.getByTestId("password");
        const loginButton = screen.getByText(/LOGIN/i);

        await act(async () => {
            await user.type(usernameInput, nonExistingUser["username"]);
            expect(usernameInput.value).toBe(nonExistingUser["username"]);

            await user.type(emailInput, nonExistingUser["email"]);
            expect(emailInput.value).toBe(nonExistingUser["email"]);

            await user.type(passwordInput, nonExistingUser["password"]);
            expect(passwordInput.value).toBe(nonExistingUser["password"]);

            await user.click(loginButton);
        });

        expect(mockedFetch).toHaveBeenCalledTimes(1);

        const alertMessage = screen.getByTestId("alert-message");
        expect(alertMessage).toHaveTextContent(
            "Credentials are not valid. Register a new user first!"
        );
    });

    it("should display warning message on registering an already existing email", async () => {
        const existingUser = {
            username: "testuser1",
            email: "testuser@gmail.com",
            password: "Testpass1!",
        };

        const fakeResponse = { error: null };
        const mockedFetch = jest.spyOn(global, "fetch").mockResolvedValue({
            json: jest.fn().mockResolvedValue(fakeResponse),
        });

        act(() => {
            render(<Login setLoginToken={mockSetLoginToken} />);
        });

        const loginRegisterText = screen.getByTestId("loginRegisterSwitch");
        fireEvent.click(loginRegisterText);

        expect(loginRegisterText).toBeVisible();
        expect(loginRegisterText).toHaveTextContent(
            "You already have an account? Login here!"
        );

        const usernameInput = screen.getByTestId("username");
        const emailInput = screen.getByTestId("email");
        const passwordInput = screen.getByTestId("password");
        const registerButton = screen.getByText(/REGISTER/i);

        await act(async () => {
            await user.type(usernameInput, existingUser["username"]);
            expect(usernameInput.value).toBe("testuser1");

            await user.type(emailInput, existingUser["email"]);
            expect(emailInput.value).toBe("testuser@gmail.com");

            await user.type(passwordInput, existingUser["password"]);
            expect(passwordInput.value).toBe("Testpass1!");

            await user.click(registerButton);
        });

        expect(mockedFetch).toHaveBeenCalledTimes(1);

        const alertMessage = screen.getByTestId("alert-message");
        expect(alertMessage).toHaveTextContent("Registered user!");
    });
});
