import { fireEvent, render } from "@testing-library/react";

import Login from "../Login";

describe("Tests Login form is correctly displayed", () => {
  it("should display login form", () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId("form")).toBeVisible();
  });

  it("should display username input", () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId("username")).toBeVisible();
  });

  it("should display 'Username' label on input", () => {
    const { getByLabelText } = render(<Login />);
    expect(getByLabelText(/Username/i)).toBeVisible();
  });

  it("should display 'Enter username' placeholder on input", () => {
    const { getByPlaceholderText } = render(<Login />);
    expect(getByPlaceholderText(/Enter username/i)).toBeVisible();
  });

  it("should display email input", () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId("email")).toBeVisible();
  });

  it("should display 'Email' label on input", () => {
    const { getByLabelText } = render(<Login />);
    expect(getByLabelText(/Email/i)).toBeVisible();
  });

  it("should display 'Enter email' placeholder on input", () => {
    const { getByPlaceholderText } = render(<Login />);
    expect(getByPlaceholderText(/Enter email/i)).toBeVisible();
  });

  it("should display password input", () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId("password")).toBeVisible();
  });

  it("should display 'Password' label on input", () => {
    const { getByLabelText } = render(<Login />);
    expect(getByLabelText(/Password/i)).toBeVisible();
  });

  it("should display 'Enter password' placeholder on input", () => {
    const { getByPlaceholderText } = render(<Login />);
    expect(getByPlaceholderText(/Enter password/i)).toBeVisible();
  });

  it("should display submit button", () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId("submit")).toBeVisible();
  });

  it("should display 'You don't have an account? Register here!'", () => {
    const { getByText } = render(<Login />);
    expect(getByText(/You don't have an account?/i)).toBeVisible();
    expect(getByText(/Register here!/i)).toBeVisible();
  });

  it("should display 'Remember me' text", () => {
    const { getByText } = render(<Login />);
    expect(getByText(/Remember me/i)).toBeVisible();
  });
});

describe("Tests Login form correct initial state", () => {
  it("should have initial username input value be empty", () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId("username").value).toBe("");
  });

  it("should have initial email input value be empty", () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId("email")).toHaveValue("");
  });

  it("should have initial password input value be empty", () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId("password")).toHaveValue("");
  });

  it("should have 'Remember me' checkbox checked", () => {
    const { getAllByRole } = render(<Login />);
    const checkbox = getAllByRole("checkbox")[1];
    expect(checkbox).toBeChecked();
  });
});

describe("Tests Login form inputs update values correctly", () => {
  it("should have updated username value after user input", () => {
    const { getByTestId } = render(<Login />);
    const usernameInput = getByTestId("username");
    fireEvent.change(usernameInput, { target: { value: "Manuel" } });
    expect(usernameInput.value).toBe("Manuel");
  });

  it("should have updated email value after user input", () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId("email");
    fireEvent.change(emailInput, { target: { value: "manuel@gmail.com" } });
    expect(emailInput.value).toBe("manuel@gmail.com");
  });

  it("should have updated password value after user input", () => {
    const { getByTestId } = render(<Login />);
    const passwordInput = getByTestId("password");
    fireEvent.change(passwordInput, { target: { value: "12345678!?" } });
    expect(passwordInput.value).toBe("12345678!?");
  });
});
