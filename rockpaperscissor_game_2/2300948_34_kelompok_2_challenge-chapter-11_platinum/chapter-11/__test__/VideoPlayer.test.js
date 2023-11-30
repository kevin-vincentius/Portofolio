import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import VideoPlayer from "../src/components/VideoPlayer/VideoPlayer";

test("Video Player component renders correctly", () => {
  const { container } = render(<VideoPlayer src="tutorial.mp4" />);

  // Positive Test 1: Check if the Video Player class are loaded correctly
  const videoPlayerClass = container.querySelector("video");
  expect(videoPlayerClass).toHaveClass("video-player");

  // Positive Test 2: Check if the button Play are rendered
  const playButtonElement = screen.getByText("Play");
  expect(playButtonElement).toBeInTheDocument();

  // Positive Test 3: Check if the button Pause are rendered
  const pauseButtonElement = screen.getByText("Pause");
  expect(pauseButtonElement).toBeInTheDocument();

  // Positive Test 4: Check if the button Fast Forward are rendered
  const fastForwardElement = screen.getByText("Fast Forward");
  expect(fastForwardElement).toBeInTheDocument();

  // Positive Test 5: Check if the button Rewind are rendered
  const rewindButtonElement = screen.getByText("Rewind");
  expect(rewindButtonElement).toBeInTheDocument();
});

test("Video Player buttons trigger actions", () => {
  render(<VideoPlayer src="valid-source.mp4" />);

  // Mock video play/pause functions
  jest.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => {});
  jest.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});

  // Positive test 6: Simulate Play button clicks and check if corresponding functions are called
  const playButton = screen.getByText("Play");
  fireEvent.click(playButton);
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();

  // Positive test 7: Simulate Pause button clicks and check if corresponding functions are called
  const pauseButton = screen.getByText("Pause");
  fireEvent.click(pauseButton);
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();

  // Reset the mock implementation after the test
  HTMLMediaElement.prototype.play.mockRestore();
  HTMLMediaElement.prototype.pause.mockRestore();
});

test("Video Player buttons do not trigger actions if not clicked", () => {
  render(<VideoPlayer src="valid-source.mp4" />);

  jest.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => {});
  jest.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});

  // Negative test 1: Ensure the Play function is not initially called without a click
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();

  // Negative test 2: Ensure the Pause function is not initially called without a click
  expect(HTMLMediaElement.prototype.pause).not.toHaveBeenCalled();

  HTMLMediaElement.prototype.play.mockRestore();
  HTMLMediaElement.prototype.pause.mockRestore();
});
