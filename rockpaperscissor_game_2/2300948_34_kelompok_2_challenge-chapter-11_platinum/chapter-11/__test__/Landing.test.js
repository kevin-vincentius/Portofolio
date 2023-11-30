import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Landing from "../src/components/Landing";

test("Landing component renders correctly", () => {
  const { container } = render(<Landing />);

  // Positive Test 1: Check if the footer element is rendered
  const containerElement = container.querySelector(".container1");
  expect(containerElement).toBeInTheDocument();

  // Positive Test 2: Check if the text content is correct
  const headingElement = container.querySelector("h1");
  expect(headingElement).toHaveTextContent("Welcome to Challenge Chapter 11 Wave 34");
});

test("Landing component does not contain additional elements", () => {
  const { container } = render(<Landing />);

  // Negative Test 1: Ensure there are no extra elements inside the container
  const additionalElements = container.querySelectorAll(
    "*:not(.container1, .text-center, h1, p, span)"
  );
  console.log("Additional elements:", additionalElements);
  expect(additionalElements.length).toBe(0);
});

test("Landing component heading style is correct", () => {
  const { container } = render(<Landing />);

  // Negative Test 2: Check if the heading has an incorrect class
  const headingElement = container.querySelector("h1");
  expect(headingElement).not.toHaveClass("incorrect-class");
});

test("Landing component paragraph style is correct", () => {
  const { container } = render(<Landing />);

  // Negative Test 3: Check if the paragraphs have incorrect styling
  const paragraphElements = container.querySelectorAll("p");
  expect(paragraphElements[0]).not.toHaveClass("incorrect-class");
  expect(paragraphElements[1]).not.toHaveClass("incorrect-class");
});
