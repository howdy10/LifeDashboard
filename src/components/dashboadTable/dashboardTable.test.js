import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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

test("Render Rows with object lists", () => {
  render(
    <DashboardTable
      data={{
        key1: { ValueTest: "Row1-col1", TestValue: "Row1-col2" },
        key2: { ValueTest: "Row2-col1", TestValue: "Row2-col2" },
      }}
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

test("Render Rows with edit icon", () => {
  render(
    <DashboardTable
      data={[{ ValueTest: "test", TestValue: "test" }]}
      columns={[
        { title: "FirstMoney", field: "ValueTest" },
        { title: "SecondMoney", field: "TestValue" },
      ]}
      rowEdits={() => {}}
    />
  );

  const ActionColumn = screen.queryByTestId("column-action");
  expect(ActionColumn).toHaveTextContent("Action");

  const menuButton = screen.queryByTestId("action-menu-icon");
  fireEvent.click(menuButton);

  const editButton = screen.queryByTestId("cell-action-edit");
  const deleteButton = screen.queryByTestId("cell-action-delete");
  expect(editButton).toBeTruthy();
  expect(deleteButton).not.toBeTruthy();
});

test("Render Rows with delete icon", () => {
  render(
    <DashboardTable
      data={[{ ValueTest: "test", TestValue: "test" }]}
      columns={[
        { title: "FirstMoney", field: "ValueTest" },
        { title: "SecondMoney", field: "TestValue" },
      ]}
      rowDelete={() => {}}
    />
  );

  const ActionColumn = screen.queryByTestId("column-action");
  expect(ActionColumn).toHaveTextContent("Action");

  const menuButton = screen.queryByTestId("action-menu-icon");
  fireEvent.click(menuButton);
  const editButton = screen.queryByTestId("cell-action-edit");
  const deleteButton = screen.queryByTestId("cell-action-delete");

  expect(deleteButton).toBeTruthy();
  expect(editButton).not.toBeTruthy();
});

test("Render Rows with two icon", () => {
  render(
    <DashboardTable
      data={[{ ValueTest: "test", TestValue: "test" }]}
      columns={[
        { title: "FirstMoney", field: "ValueTest" },
        { title: "SecondMoney", field: "TestValue" },
      ]}
      rowEdits={() => {}}
      rowDelete={() => {}}
    />
  );

  const ActionColumn = screen.queryByTestId("column-action");
  expect(ActionColumn).toHaveTextContent("Action");

  const menuButton = screen.queryByTestId("action-menu-icon");
  fireEvent.click(menuButton);

  const deleteButton = screen.queryByTestId("cell-action-delete");
  const editButton = screen.queryByTestId("cell-action-edit");

  expect(editButton).toBeTruthy();
  expect(deleteButton).toBeTruthy();
});

test("Render Rows with clickable icons", () => {
  let count = 0;
  render(
    <DashboardTable
      data={[{ ValueTest: "test", TestValue: "test" }]}
      columns={[
        { title: "FirstMoney", field: "ValueTest" },
        { title: "SecondMoney", field: "TestValue" },
      ]}
      rowEdits={() => {
        count = 1;
      }}
    />
  );
  const menuButton = screen.queryByTestId("action-menu-icon");
  fireEvent.click(menuButton);
  const editButton = screen.queryByTestId("fab-action-edit");
  fireEvent.click(editButton);
  const confirmButton = screen.queryByTestId("fab-action-confirm");
  fireEvent.click(confirmButton);

  expect(count).toEqual(1);
});

test("Render Rows with data values not in columns", () => {
  render(
    <DashboardTable
      data={[
        { ValueTest: "Row1-col1", TestValue: "Row1-col2", Extra: "boom" },
        { ValueTest: "Row2-col1", TestValue: "Row2-col2", NotInColumns: "lala" },
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

test("Test row asc", () => {
  render(
    <DashboardTable
      data={[
        { ValueTest: 100, TestValue: 0 },
        { ValueTest: 300, TestValue: 0 },
        { ValueTest: 200, TestValue: 0 },
      ]}
      columns={[
        { title: "FirstMoney", field: "ValueTest", type: "nullCurrency" },
        { title: "SecondMoney", field: "TestValue", type: "nullCurrency" },
      ]}
      order={{ column: "ValueTest", direction: "asc" }}
    />
  );

  const firstCell = screen.queryByTestId("cell-0-0");
  const secondCell = screen.queryByTestId("cell-1-0");
  const thridCell = screen.queryByTestId("cell-2-0");

  expect(firstCell).toHaveTextContent("$100.00");
  expect(secondCell).toHaveTextContent("$200.00");
  expect(thridCell).toHaveTextContent("$300.00");
});

test("Test row desc", () => {
  render(
    <DashboardTable
      data={[
        { ValueTest: 100, TestValue: 0 },
        { ValueTest: 300, TestValue: 0 },
        { ValueTest: 200, TestValue: 0 },
      ]}
      columns={[
        { title: "FirstMoney", field: "ValueTest", type: "nullCurrency" },
        { title: "SecondMoney", field: "TestValue", type: "nullCurrency" },
      ]}
      order={{ column: "ValueTest", direction: "desc" }}
    />
  );

  const firstCell = screen.queryByTestId("cell-0-0");
  const secondCell = screen.queryByTestId("cell-1-0");
  const thridCell = screen.queryByTestId("cell-2-0");

  expect(firstCell).toHaveTextContent("$300.00");
  expect(secondCell).toHaveTextContent("$200.00");
  expect(thridCell).toHaveTextContent("$100.00");
});

test("Render Rows Collapsable row with no row variables", () => {
  render(
    <DashboardTable
      data={[
        { ValueTest: 100, TestValue: 0 },
        { ValueTest: 300, TestValue: 0 },
        { ValueTest: 200, TestValue: 0 },
      ]}
      columns={[
        { title: "FirstMoney", field: "ValueTest", type: "nullCurrency" },
        { title: "SecondMoney", field: "TestValue", type: "nullCurrency" },
      ]}
      infoRow={() => <div data-testid="infoRow" />}
    />
  );
  const table = screen.queryByTestId("full-table");
  expect(table).toBeTruthy();

  const collapseTitle = screen.queryByTestId("column-collapse");
  const collapseIcon = screen.queryByTestId("cell-0-collapseIcon");
  const collapseRow = screen.queryByTestId("row-0-collapse");

  expect(collapseTitle).toBeTruthy();
  expect(collapseIcon).toBeTruthy();
  expect(collapseRow).toBeTruthy();
});

test("Render Rows Collapsable row with row variables", () => {
  render(
    <DashboardTable
      data={[
        { ValueTest: 100, TestValue: "TestValue0" },
        { ValueTest: 300, TestValue: "TestValue1" },
        { ValueTest: 200, TestValue: "TestValue2" },
      ]}
      columns={[
        { title: "FirstMoney", field: "ValueTest", type: "nullCurrency" },
        { title: "SecondMoney", field: "TestValue" },
      ]}
      infoRow={(x) => <div data-testid="infoRow">{x[0]}</div>}
      infoRowVaribles={["TestValue"]}
    />
  );
  const table = screen.queryByTestId("full-table");
  expect(table).toBeTruthy();

  const collapseTitle = screen.queryByTestId("column-collapse");
  const collapseIcon = screen.queryByTestId("cell-0-collapseIcon");
  const collapseRow = screen.queryByTestId("row-0-collapse");

  expect(collapseTitle).toBeTruthy();
  expect(collapseIcon).toBeTruthy();
  expect(collapseRow).toBeTruthy();
  fireEvent.click(collapseIcon);

  expect(collapseRow).toHaveTextContent("TestValue0");
  const collapseComponent = screen.queryByTestId("infoRow");
  expect(collapseComponent).toBeTruthy();
  expect(collapseComponent).toHaveTextContent("TestValue0");
});

test("Render Rows with edit function but actionswitch off", () => {
  render(
    <DashboardTable
      data={[{ ValueTest: "test", TestValue: "test" }]}
      columns={[
        { title: "FirstMoney", field: "ValueTest" },
        { title: "SecondMoney", field: "TestValue" },
      ]}
      rowEdits={() => {}}
      showActions={false}
    />
  );

  const ActionColumn = screen.queryByTestId("column-action");
  expect(ActionColumn).not.toBeTruthy();

  const menuButton = screen.queryByTestId("action-menu-icon");
  expect(menuButton).not.toBeTruthy();
});
test("Render Without Pagination", () => {
  render(
    <DashboardTable
      data={[{ ValueTest: "test", TestValue: "test" }]}
      columns={[
        { title: "FirstMoney", field: "ValueTest" },
        { title: "SecondMoney", field: "TestValue" },
      ]}
      showActions={false}
    />
  );

  const Pagination = screen.queryByTestId("table-pagination");
  expect(Pagination).not.toBeTruthy();
});
test("Render With Pagination", () => {
  render(
    <DashboardTable
      data={[{ ValueTest: "test", TestValue: "test" }]}
      columns={[
        { title: "FirstMoney", field: "ValueTest" },
        { title: "SecondMoney", field: "TestValue" },
      ]}
      showActions={false}
      showPagination={true}
    />
  );

  const Pagination = screen.queryByTestId("table-pagination");
  expect(Pagination).toBeTruthy();
});

test("Render Rows With first 5+ values", () => {
  render(
    <DashboardTable
      data={[
        { ValueTest: 100, TestValue: 0 },
        { ValueTest: 200, TestValue: 0 },
        { ValueTest: 300, TestValue: 0 },
        { ValueTest: 400, TestValue: 0 },
        { ValueTest: 500, TestValue: 0 },
        { ValueTest: 600, TestValue: 0 },
      ]}
      columns={[
        { title: "FirstMoney", field: "ValueTest" },
        { title: "SecondMoney", field: "TestValue" },
      ]}
    />
  );

  const Row1 = screen.queryByTestId("row-0");
  const Row2 = screen.queryByTestId("row-1");
  const Row3 = screen.queryByTestId("row-2");
  const Row4 = screen.queryByTestId("row-3");
  const Row5 = screen.queryByTestId("row-4");
  const Row6 = screen.queryByTestId("row-5");

  expect(Row1).toBeTruthy();
  expect(Row2).toBeTruthy();
  expect(Row3).toBeTruthy();
  expect(Row4).toBeTruthy();
  expect(Row5).toBeTruthy();
  expect(Row6).toBeTruthy();
});
test("Render Pagination Rows With first 5+ values", () => {
  render(
    <DashboardTable
      data={[
        { ValueTest: 100, TestValue: 0 },
        { ValueTest: 200, TestValue: 0 },
        { ValueTest: 300, TestValue: 0 },
        { ValueTest: 400, TestValue: 0 },
        { ValueTest: 500, TestValue: 0 },
        { ValueTest: 600, TestValue: 0 },
      ]}
      columns={[
        { title: "FirstMoney", field: "ValueTest" },
        { title: "SecondMoney", field: "TestValue" },
      ]}
      showPagination={true}
    />
  );

  const Row1 = screen.queryByTestId("row-0");
  const Row2 = screen.queryByTestId("row-1");
  const Row3 = screen.queryByTestId("row-2");
  const Row4 = screen.queryByTestId("row-3");
  const Row5 = screen.queryByTestId("row-4");
  const Row6 = screen.queryByTestId("row-5");

  expect(Row1).toBeTruthy();
  expect(Row2).toBeTruthy();
  expect(Row3).toBeTruthy();
  expect(Row4).toBeTruthy();
  expect(Row5).toBeTruthy();
  expect(Row6).not.toBeTruthy();
});

test("Render Pagination Rows With first 5+ values click next button", () => {
  render(
    <DashboardTable
      data={[
        { ValueTest: 100, TestValue: 0 },
        { ValueTest: 200, TestValue: 0 },
        { ValueTest: 300, TestValue: 0 },
        { ValueTest: 400, TestValue: 0 },
        { ValueTest: 500, TestValue: 0 },
        { ValueTest: 600, TestValue: 0 },
      ]}
      columns={[
        { title: "FirstMoney", field: "ValueTest" },
        { title: "SecondMoney", field: "TestValue" },
      ]}
      showPagination={true}
    />
  );

  const nextButton = screen.queryByTestId("table-pagination-nextButton");

  fireEvent.click(nextButton);

  const Row1 = screen.queryByTestId("row-0");
  const Row2 = screen.queryByTestId("row-1");
  const Row3 = screen.queryByTestId("row-2");
  const Row4 = screen.queryByTestId("row-3");
  const Row5 = screen.queryByTestId("row-4");
  const Row6 = screen.queryByTestId("row-5");

  expect(Row1).not.toBeTruthy();
  expect(Row2).not.toBeTruthy();
  expect(Row3).not.toBeTruthy();
  expect(Row4).not.toBeTruthy();
  expect(Row5).not.toBeTruthy();
  expect(Row6).toBeTruthy();
});
test("Test missing coloumn data", () => {
  render(
    <DashboardTable
      data={[
        { ValueTest: 100, TestValue: 11 },
        { ValueTest: 200, Mid: "something", TestValue: 22 },
        { ValueTest: 300, TestValue: 33 },
      ]}
      columns={[
        { title: "FirstMoney", field: "ValueTest" },
        { title: "MidMoney", field: "Mid" },
        { title: "SecondMoney", field: "TestValue" },
      ]}
    />
  );

  const cell11 = screen.queryByTestId("cell-0-0");
  const cell12 = screen.queryByTestId("cell-0-1");
  const cell13 = screen.queryByTestId("cell-0-2");
  const cell21 = screen.queryByTestId("cell-1-0");
  const cell22 = screen.queryByTestId("cell-1-1");
  const cell23 = screen.queryByTestId("cell-1-2");
  const cell31 = screen.queryByTestId("cell-2-0");
  const cell32 = screen.queryByTestId("cell-2-1");
  const cell33 = screen.queryByTestId("cell-2-2");

  expect(cell11).toBeTruthy();
  expect(cell12).toBeTruthy();
  expect(cell13).toBeTruthy();
  expect(cell21).toBeTruthy();
  expect(cell22).toBeTruthy();
  expect(cell23).toBeTruthy();
  expect(cell31).toBeTruthy();
  expect(cell32).toBeTruthy();
  expect(cell33).toBeTruthy();
});
test("Test column alignment prop", () => {});
