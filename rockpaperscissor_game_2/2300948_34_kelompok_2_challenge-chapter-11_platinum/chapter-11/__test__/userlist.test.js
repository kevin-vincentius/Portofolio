import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UsersList from "../src/components/userlist/userlist";
import { store } from "../src/redux/store";
import { Provider } from "react-redux";

test("User List component renders correctly", async () => {
  // Mock the fetchUsers function
  const fetchUsers = jest.fn();

  // Render the component
  const { container } = render(
    <Provider store={store}>
      <UsersList fetchUsers={fetchUsers} />
    </Provider>
  );

  // Positive Test 1: Check if the "List of Users:" header is rendered
  const userListHeader = screen.getByText("List of Users:");
  expect(userListHeader).toBeInTheDocument();

  // Negative Test 1: Check to see if authenticated class is not initially rendered
  const authenticatedState = container.querySelector("div");
  expect(authenticatedState).not.toHaveClass("authenticated-text");

  // Negative Test 2: Check to see if text for authenticated user are not initially rendered
  const textElement = screen.queryByText("Current User");
  expect(textElement).not.toBeInTheDocument();
});
