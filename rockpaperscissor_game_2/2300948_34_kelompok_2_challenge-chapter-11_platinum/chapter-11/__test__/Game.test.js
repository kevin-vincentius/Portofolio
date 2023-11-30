import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import Game from "@/components/game/game";
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { updateRound, updateStatus, updateScoreWin, updateScoreLoss } from '../src/redux/gameSlice';

const mockStore = configureStore([]);
  
describe("Game component test", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { isAuth: false }, // Mock your auth state
      game: {
        round: 1,
        status: null,
        scoreWin: 0,
        scoreLoss: 0,
      },
    });
  });

  it("renders game page", () => {
    const { container, getByText } = render(
      <Provider store={store}>
        <Game />
      </Provider>
    );
    
    const rockButton = getByText("rock");
    const paperButton = getByText("paper");
    const scissorsButton = getByText("scissors");
    const leaderboardText = container.querySelector("div");

    // Buttons and leaderboard assertions
    expect(rockButton).toBeInTheDocument();
    expect(paperButton).toBeInTheDocument();
    expect(scissorsButton).toBeInTheDocument();
    expect(leaderboardText).toHaveTextContent("Leaderboard");
  });

  it("game result handling", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Game />
      </Provider>
    );

    const rockButton = getByText("rock");

    // get player choice
    fireEvent.click(rockButton);
    const playerChoiceElement = getByText("Your Choice:");
    expect(playerChoiceElement).toHaveTextContent("Your Choice: rock");
    expect(playerChoiceElement).toHaveTextContent(/rock|paper|scissors/i);

    // get computer choice
    const computerChoiceElement = getByText("Computers Choice:");
    expect(computerChoiceElement.textContent).toMatch(/rock|paper|scissors/i);
  });

  it('redirects to login when user is not authenticated', () => {
    // Mock the Redux store with isAuth set to false
    const initialState = { auth: { isAuth: false }, game: { /* initialize your game state here */ } };
    const store = mockStore(initialState);

    // Render the Game component within MemoryRouter to simulate routing
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Game />
        </MemoryRouter>
      </Provider>
    );

    // Check if the user is redirected to the login page
    expect(container.innerHTML).toContain('Login'); // Adjust based on your actual login page content
  });

  it('renders RedirectPopUp when user is not authenticated', () => {
    // Mock the Redux store with isAuth set to false
    const initialState = { auth: { isAuth: false }, game: { /* initialize your game state here */ } };
    const store = mockStore(initialState);

    // Render the Game component within MemoryRouter to simulate routing
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Game />
        </MemoryRouter>
      </Provider>
    );

    // Check if RedirectPopUp is rendered
    const redirectPopupText = getByText('You have to login to access this page.');
    expect(redirectPopupText).toBeInTheDocument();
  });

  it('handles player winning a round', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Game />
      </Provider>
    );

    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

    fireEvent.click(getByText('rock'));
  
    // Wait for asynchronous operations to complete
    await waitFor(() => {
      // Use setTimeout to introduce a delay before checking Redux actions
      setTimeout(() => {
        // Add your assertions for the updated state
        expect(store.getActions()).toContainEqual(updateRound(2));
        expect(store.getActions()).toContainEqual(updateStatus('You win!'));
        expect(store.getActions()).toContainEqual(updateScoreWin(1));
      }, 500); // Adjust the delay as needed
    });
  
    // Restore the original implementation of Math.random
    global.Math.random.mockRestore();
  });

  it('handles player losing a round', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Game />
      </Provider>
    );
  
    jest.spyOn(global.Math, 'random').mockReturnValue(0);
  
    fireEvent.click(getByText('scissors'));
  
    // Wait for asynchronous operations to complete
    await waitFor(() => {
      // Use setTimeout to introduce a delay before checking Redux actions
      setTimeout(() => {
        // Add your assertions for the updated state
        expect(store.getActions()).toContainEqual(updateRound(2));
        expect(store.getActions()).toContainEqual(updateStatus('Computer wins!'));
        expect(store.getActions()).toContainEqual(updateScoreLoss(1));
      }, 500); // Adjust the delay as needed
    });
  
    // Restore the original implementation of Math.random
    global.Math.random.mockRestore();
  });


});
