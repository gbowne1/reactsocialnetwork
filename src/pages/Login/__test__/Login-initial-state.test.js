import { fireEvent, render, screen } from "@testing-library/react";

import Login from "../Login";

describe("Tests Login form is correctly displayed", () => {
  it("should render login form elements", () => {
    render(<Login />);

    expect(screen.getByTestId("form")).toBeVisible();

    expect(screen.getByTestId("username")).toBeVisible();
    expect(screen.getByLabelText(/Username/i)).toBeVisible();
    expect(screen.getByPlaceholderText(/Enter username/i)).toBeVisible();

    expect(screen.getByTestId("email")).toBeVisible();
    expect(screen.getByLabelText(/Email/i)).toBeVisible();
    expect(screen.getByPlaceholderText(/Enter email/i)).toBeVisible();

    expect(screen.getByTestId("password")).toBeVisible();
    expect(screen.getByLabelText(/Password/i)).toBeVisible();
    expect(screen.getByPlaceholderText(/Enter password/i)).toBeVisible();

    expect(screen.getByTestId("submit")).toBeVisible();

    expect(screen.getByText(/Register here!/i)).toBeVisible();
    expect(screen.getByText(/Remember me/i)).toBeVisible();
  });
});

describe("Tests Login form correct initial state", () => {
  it("should have correct initial state for all elements", () => {
    render(<Login />);

    expect(screen.getByTestId("username").value).toBe("");
    expect(screen.getByTestId("email")).toHaveValue("");
    expect(screen.getByTestId("password")).toHaveValue("");

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
