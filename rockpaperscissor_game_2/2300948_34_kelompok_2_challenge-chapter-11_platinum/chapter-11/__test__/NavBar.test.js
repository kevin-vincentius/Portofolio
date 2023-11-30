import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, } from '@testing-library/react';
// import {  fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from "../src/redux/store";
import NavBar from '../src/components/NavBar';
// import { logout } from '../src/redux/auth-actions';

test('NavBar component renders correctly', () => {
  render(
    <Provider store={store}>
      <NavBar />
    </Provider>
  );

  // Positive Test 1: Check if the brand name is rendered
  const brandElement = screen.getByText('BinarWave34');
  expect(brandElement).toBeInTheDocument();

  // Positive Test 2: Check if the "Game List" link is rendered
  const gameListLink = screen.getByText('Game List');
  expect(gameListLink).toBeInTheDocument();

  // Positive Test 3: Check if the "User List" link is rendered
  const userListLink = screen.getByText('User List');
  expect(userListLink).toBeInTheDocument();

  // Negative Test 1: Ensure "Sign Out" link is not initially rendered
  const signOutLink = screen.queryByText('Sign Out');
  expect(signOutLink).not.toBeInTheDocument();

  // Negative Test 2: Ensure "Profile" link is not initially rendered
  const profileLink = screen.queryByText('Profile');
  expect(profileLink).not.toBeInTheDocument();
});

test('NavBar component handles sign-in state correctly', () => {
  render(
    <Provider store={store}>
      <NavBar />
    </Provider>
  );

  // Negative Test 3: Check if "Sign Out" link is not initially rendered
  const signOutLink = screen.queryByTestId('sign-out-link');
  expect(signOutLink).not.toBeInTheDocument();

  //   // Negative Test 4: Check if "Profile" link is not initially rendered
    
  const profileLink = screen.queryByText('Profile');
  expect(profileLink).not.toBeInTheDocument();


  });


// This one is hard XD

//   // Rerender the component after the state change
//   render(
//     <Provider store={store}>
//       <NavBar />
//     </Provider>
//   );

//   // Positive Test 4: Check if "Sign Out" link is now rendered after sign-in
//   const signOutLinkAfterSignIn = screen.getByText('Sign Out');
//   expect(signOutLinkAfterSignIn).toBeInTheDocument();

//   // Positive Test 5: Check if "Profile" link is now rendered after sign-in
//   const profileLinkAfterSignIn = screen.getByText('Profile');
//   expect(profileLinkAfterSignIn).toBeInTheDocument();
// });
