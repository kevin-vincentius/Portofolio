// Profile.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import { store } from "../src/redux/store";
import Profile from '@/components/profile/profile';

describe('Profile component', () => {
  test('renders profile data', () => {
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );

    // Positive Test 1: Verify that the labels and form controls are present
    expect(screen.getByText('Username:')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('Total Wins:')).toBeInTheDocument();
    expect(screen.getByText('Total Losses:')).toBeInTheDocument();
    expect(screen.getByText('Bio:')).toBeInTheDocument();
    expect(screen.getByText('City:')).toBeInTheDocument();

    // Negative Test 1: Verify that the 'Save Profile' button is not present initially
    expect(screen.queryByText('Save Profile')).not.toBeInTheDocument();

  });

  test('does not render certain elements in edit mode', () => {
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );

    fireEvent.click(screen.getByText('Edit'));

    // Negative Test 2: Verify that certain elements are not present in edit mode
    expect(screen.queryByLabelText('Bio:')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('City:')).not.toBeInTheDocument();

    // Positive Test 2: Verify that the 'Save Profile' button is present in edit mode
    expect(screen.queryByText('Save Profile')).toBeInTheDocument();

    // Negative Test 3: Verify that the 'Edit' button is not present in edit mode
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();

  });

});
