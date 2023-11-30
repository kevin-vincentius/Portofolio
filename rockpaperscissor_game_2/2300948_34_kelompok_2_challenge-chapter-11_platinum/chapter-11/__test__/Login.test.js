import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import Login from "../src/components/login/login"; // Adjust the import path
import { store } from "../src/redux/store";

beforeEach(() => {
  // Clean up the DOM between tests
  document.body.innerHTML = "";
});

jest.mock("../src/firebase/firebase", () => {
  return {
    auth: {
      // Mock the authentication functions as needed
      signInWithEmailAndPassword: jest.fn(),
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

describe("Login Component", () => {
  it("renders the Login Page", () => {
    const { container } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    // Positive Test 1: Check if the form element is rendered
    const formElement = container.querySelector("form");
    expect(formElement).toBeInTheDocument();

    // Positive Test 2: Check if the text in the form header is correct
    const textElement = container.querySelector(".RegisterLoginHeader .text");
    expect(textElement).toHaveTextContent("Login");
  });
});
