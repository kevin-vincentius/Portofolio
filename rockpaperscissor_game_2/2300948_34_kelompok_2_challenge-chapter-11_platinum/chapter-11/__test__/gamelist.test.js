import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GameList from "../src/components/game/gamelist/gamelist";
import { store } from "../src/redux/store";
import { Provider } from "react-redux";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: () => {},
  }),
}));

test("Game List component renders correctly", () => {
  render(
    <Provider store={store}>
      <GameList />;
    </Provider>
  );
  // Positive Test 1: Check is the Rock Paper Scissor card header is rendered
  const rpsHeader = screen.getByText("Rock Paper Scissor");
  expect(rpsHeader).toBeInTheDocument();

  // Positive Test 2: Check is the Rock Paper Scissor card header is rendered
  const gameDummyHeader = screen.getByText("Game Dummy");
  expect(gameDummyHeader).toBeInTheDocument();

  // Negative Test 1: Check to see if the "Already Played" state on the button is not initially rendered
  const alreadyPlayedButton = screen.queryByText("Already Played");
  expect(alreadyPlayedButton).not.toBeInTheDocument();

  // Negative Test 2: Check to see if the "Coming Soon" is disabled
  const playNowButton = screen.getByText("Coming Soon");
  expect(playNowButton).toHaveAttribute("disabled");
});
