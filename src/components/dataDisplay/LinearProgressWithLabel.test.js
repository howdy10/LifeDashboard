import React from "react";
import { render, screen } from "@testing-library/react";
import { LinearProgressWithLabel } from "./linearProgressWithLabel";
import "@testing-library/jest-dom";

test("Just render something", () => {
  render(<LinearProgressWithLabel current={50} goal={100} />);
  expect(screen).toBeTruthy();
});

test("Render with default props no labels", () => {
  render(<LinearProgressWithLabel current={50} goal={100} />);
  const currentLabel = screen.queryByTestId("current-label");
  const goalLabel = screen.queryByTestId("goal-label");

  expect(currentLabel).toBeNull();
  expect(goalLabel).toBeNull();
});

test("Render current label exist", () => {
  render(<LinearProgressWithLabel current={50} goal={100} showCurrentLabel={true} />);
  const currentLabel = screen.queryByTestId("current-label");
  const goalLabel = screen.queryByTestId("goal-label");

  expect(currentLabel).toBeTruthy();
  expect(goalLabel).toBeNull();
});

test("Render goal label exist", () => {
  render(<LinearProgressWithLabel current={50} goal={100} showGoalLabel={true} />);
  const currentLabel = screen.queryByTestId("current-label");
  const goalLabel = screen.queryByTestId("goal-label");

  expect(goalLabel).toBeTruthy();
  expect(currentLabel).toBeNull();
});

test("Test current label text", () => {
  render(<LinearProgressWithLabel current={50} goal={100} showCurrentLabel={true} />);

  const currentLabel = screen.queryByTestId("current-label-text");

  expect(currentLabel).toHaveTextContent("50");
});

test("Test current goal text", () => {
  render(<LinearProgressWithLabel current={50} goal={100} showGoalLabel={true} />);

  const currentLabel = screen.queryByTestId("goal-label-text");

  expect(currentLabel).toHaveTextContent("100");
});
