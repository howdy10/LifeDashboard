import React from "react";
import { render, screen } from "@testing-library/react";
import { DashboardTable } from "./dashboardTable";
import "@testing-library/jest-dom";

test("Just render something", () => {
  render(<DashboardTable data={[]} columns={[]} />);
  expect(screen).toBeTruthy();
});

test("Render Colums", () => {
  render(
    <DashboardTable
      data={[]}
      columns={[
        { title: "ViewTest", field: "ValueTest", type: "money" },
        { title: "TestView", field: "TestValue", type: "money" },
      ]}
    />
  );
  const table = screen.queryByTestId("full-table");
  const Column1 = screen.queryByTestId("column-0");
  const Column2 = screen.queryByTestId("column-1");

  expect(table).toBeTruthy();
  expect(Column1).toHaveTextContent("ViewTest");
  expect(Column2).toHaveTextContent("TestView");
});

test("Render Rows with value check", () => {
  render(
    <DashboardTable
      data={[
        { ValueTest: "Row1-col1", TestValue: "Row1-col2" },
        { ValueTest: "Row2-col1", TestValue: "Row2-col2" },
      ]}
      columns={[
        { title: "ViewTest", field: "ValueTest" },
        { title: "TestView", field: "TestValue" },
      ]}
    />
  );
  const table = screen.queryByTestId("full-table");
  const Column1 = screen.queryByTestId("column-0");
  const Column2 = screen.queryByTestId("column-1");

  const Row1 = screen.queryByTestId("row-0");
  const Row2 = screen.queryByTestId("row-1");

  const cell11 = screen.queryByTestId("cell-0-0");
  const cell12 = screen.queryByTestId("cell-0-1");
  const cell21 = screen.queryByTestId("cell-1-0");
  const cell22 = screen.queryByTestId("cell-1-1");

  expect(table).toBeTruthy();
  expect(Column1).toHaveTextContent("ViewTest");
  expect(Column2).toHaveTextContent("TestView");
  expect(Row1).toBeTruthy();
  expect(Row2).toBeTruthy();

  expect(cell11).toHaveTextContent("Row1-col1");
  expect(cell12).toHaveTextContent("Row1-col2");
  expect(cell21).toHaveTextContent("Row2-col1");
  expect(cell22).toHaveTextContent("Row2-col2");
});

test("Render Rows with currency format", () => {
  render(
    <DashboardTable
      data={[{ ValueTest: 200, TestValue: 50.5 }]}
      columns={[
        { title: "FirstMoney", field: "ValueTest", type: "currency" },
        { title: "SecondMoney", field: "TestValue", type: "currency" },
      ]}
    />
  );

  const cell11 = screen.queryByTestId("cell-0-0");
  const cell12 = screen.queryByTestId("cell-0-1");

  expect(cell11).toHaveTextContent("$200.00");
  expect(cell12).toHaveTextContent("50.50");
});

test("Render Rows with date format", () => {
  render(
    <DashboardTable
      data={[{ ValueTest: 1644247795000, TestValue: 1629300595000 }]}
      columns={[
        { title: "FirstMoney", field: "ValueTest", type: "date" },
        { title: "SecondMoney", field: "TestValue", type: "date" },
      ]}
    />
  );

  const cell11 = screen.queryByTestId("cell-0-0");
  const cell12 = screen.queryByTestId("cell-0-1");

  expect(cell11).toHaveTextContent("02/07/2022");
  expect(cell12).toHaveTextContent("08/18/2021");
});

test("Render Rows with boolean values", () => {
  render(
    <DashboardTable
      data={[{ ValueTest: true, TestValue: false }]}
      columns={[
        { title: "FirstMoney", field: "ValueTest", type: "boolean" },
        { title: "SecondMoney", field: "TestValue", type: "boolean" },
      ]}
    />
  );

  const cell11 = screen.queryByTestId("cell-0-0");
  const cell12 = screen.queryByTestId("cell-0-1");

  const checkContainer = screen.queryByTestId("check-icon");
  const closeContainer = screen.queryByTestId("close-icon");

  expect(cell11).toContainElement(checkContainer);
  expect(cell12).toContainElement(closeContainer);
});

test("Render Rows with N/A for $0 values", () => {
  render(
    <DashboardTable
      data={[{ ValueTest: 200, TestValue: 0 }]}
      columns={[
        { title: "FirstMoney", field: "ValueTest", type: "nullCurrency" },
        { title: "SecondMoney", field: "TestValue", type: "nullCurrency" },
      ]}
    />
  );

  const cell11 = screen.queryByTestId("cell-0-0");
  const cell12 = screen.queryByTestId("cell-0-1");

  expect(cell11).toHaveTextContent("$200.00");
  expect(cell12).toHaveTextContent("N/A");
});

test("Render Rows with icons", () => {});
test("Render Rows with clickable icons", () => {});
test("Render Rows Collapsable row", () => {});
