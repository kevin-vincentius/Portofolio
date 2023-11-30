import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import Register from "../src/components/register/register"; // Adjust the import path
import { store } from "../src/redux/store";

beforeEach(() => {
  // Clean up the DOM between tests
  document.body.innerHTML = "";
});

jest.mock("../src/firebase/firebase", () => {
  return {
    auth: {
      createUserWithEmailAndPassword: jest.fn(),
      // Mock other auth functions as needed
    },
    // Mock other Firebase services used in your components
  };
});

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    // Provide the minimal router properties you need
    push: () => {},
  }),
}));

describe("Register Component", () => {
  it("renders the Register Page", () => {
    const { container } = render(
      <Provider store={store}>
        <Register />
      </Provider>
    );
    // Positive Test 1: Check if the form element is rendered
    const formElement = container.querySelector("form");
    expect(formElement).toBeInTheDocument();

    // Positive Test 2: Check if the text in the form header is correct
    const textElement = container.querySelector("div");
    expect(textElement).toHaveTextContent("Register");
  });

  it("handles registration correctly", async () => {
    // Test registration success scenario
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Register />
      </Provider>
    );

    // Simulate user input
    const usernameInput = getByPlaceholderText("Username");
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.change(usernameInput, { target: { value: "testUser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });

    // Simulate form submission
    const submitButton = getByText("Register", { selector: "button" });
    fireEvent.click(submitButton);

    // Positive Test 3: Check if the correct submit button are clicked
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("handles registration failure correctly", async () => {
    // Test registration failed scenario
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Register />
      </Provider>
    );

    const usernameInput = getByPlaceholderText("Username");
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.change(usernameInput, { target: { value: "sapi" } });
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });

    const submitButton = getByText("Register", { selector: "button" });
    fireEvent.click(submitButton);

    // Negative Test 1: Check if the wrong email are inputted
    expect(emailInput).toHaveValue("invalid-email");

    // Negative Test 2: Check if the error message when inputing a wrong email format is displayed
    const emailErrorMessage = getByText("Invalid email format");
    expect(emailErrorMessage).toBeInTheDocument();

    // Negative Test 3: Check if the error message when inputing a username less than 5 characters are displayed
    const usernameErrorMessage = getByText(
      "Please Input more than 5 characters"
    );
    expect(usernameErrorMessage).toBeInTheDocument();
  });
});
