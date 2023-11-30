import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../src/components/Footer';
import '@testing-library/jest-dom'
test('Footer component renders correctly', () => {
  const { container } = render(<Footer />);

  // Positive Test 1: Check if the footer element is rendered
  const footerElement = container.querySelector('footer');
  expect(footerElement).toBeInTheDocument();

  // Positive Test 2: Check if the text content is correct
  const textElement = container.querySelector('p');
  expect(textElement).toHaveTextContent('Created by Team2 Binar Wave 34');
});

test('Footer component does not contain additional elements', () => {
  const { container } = render(<Footer />);

  // Negative Test 1: Ensure there are no extra elements inside the footer
  const additionalElements = container.querySelectorAll('*:not(footer, p)');
  expect(additionalElements.length).toBe(0);
});

test('Footer component has correct styling', () => {
  const { container } = render(<Footer />);

  // Negative Test 2: Check if the footer has incorrect styling
  const footerElement = container.querySelector('footer');
  expect(footerElement).not.toHaveClass('bg-primary'); // Incorrect class

  // Negative Test 3: Check if the text element has incorrect styling
  const textElement = container.querySelector('p');
  expect(textElement).not.toHaveClass('text'); // Incorrect class
});
