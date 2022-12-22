import React from "react";
import { screen } from "@testing-library/react";
import { renderWithState } from "../__test__/utils/test-utils";
import "@testing-library/jest-dom";
import { ReminderCard } from "./reminders-card";

const initialState = {
  session: { familyIdBaseUrl: "mock" },
};

test("Error color card max", () => {
  renderWithState(
    <ReminderCard
      reminderId={1}
      reminder={{ name: "Test", typeOfOccurance: "days", day: 3, date: new Date() }}
    />,
    { initialState: initialState }
  );

  const icon = screen.queryByTestId("error-icon");
  expect(icon).toBeTruthy();
});
test("Error color card min", () => {
  renderWithState(
    <ReminderCard
      reminderId={1}
      reminder={{ name: "Test", typeOfOccurance: "days", day: 0, date: new Date() }}
    />,
    { initialState: initialState }
  );

  const icon = screen.queryByTestId("error-icon");
  expect(icon).toBeTruthy();
});
test("Error color card negative", () => {
  renderWithState(
    <ReminderCard
      reminderId={1}
      reminder={{ name: "Test", typeOfOccurance: "days", day: -2, date: new Date() }}
    />,
    { initialState: initialState }
  );

  const icon = screen.queryByTestId("error-icon");
  expect(icon).toBeTruthy();
});

test("Warning color card min", () => {
  renderWithState(
    <ReminderCard
      reminderId={1}
      reminder={{ name: "Test", typeOfOccurance: "days", day: 4, date: new Date() }}
    />,
    { initialState: initialState }
  );
  const icon = screen.queryByTestId("warning-icon");
  expect(icon).toBeTruthy();
});

test("Warning color card max", () => {
  renderWithState(
    <ReminderCard
      reminderId={1}
      reminder={{ name: "Test", typeOfOccurance: "days", day: 7, date: new Date() }}
    />,
    { initialState: initialState }
  );

  const icon = screen.queryByTestId("warning-icon");
  expect(icon).toBeTruthy();
});

test("Success color card max", () => {
  renderWithState(
    <ReminderCard
      reminderId={1}
      reminder={{ name: "Test", typeOfOccurance: "days", day: 8, date: new Date() }}
    />,
    { initialState: initialState }
  );

  const icon = screen.queryByTestId("success-icon");
  expect(icon).toBeTruthy();
});

test("Success color card mahighx", () => {
  renderWithState(
    <ReminderCard
      reminderId={1}
      reminder={{ name: "Test", typeOfOccurance: "days", day: 10, date: new Date() }}
    />,
    { initialState: initialState }
  );

  const icon = screen.queryByTestId("success-icon");
  expect(icon).toBeTruthy();
});
