import React, { useState } from "react";
import { PropTypes } from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { DashboardTableRow } from "./dashboardTable-row";

export const DashboardTable = ({
  columns,
  data,
  rowEdits,
  rowDelete,
  order,
  infoRow,
  infoRowVaribles,
  infoRowEditComponent,
  showActions = true,
}) => {
  const [rowBeingEditedId, setRowBeingEditedId] = useState(null);
  const [rowBeingDeletedId, setRowBeingDeletedId] = useState(null);
  const [infoRowOpenedId, setInfoRowOpenedId] = useState(null);

  function descendingComparator(a, b, orderBy) {
    if (data[b][orderBy] < data[a][orderBy]) {
      return -1;
    }
    if (data[b][orderBy] > data[a][orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const row = (firebaseId, rowIndex) => {
    return (
      <DashboardTableRow
        key={rowIndex}
        rowBeingEditedFirebaseId={rowBeingEditedId}
        rowBeingDeletedFirebaseId={rowBeingDeletedId}
        setRowBeingEditedFirebaseId={setRowBeingEditedId}
        setRowBeingDeletedFirebaseId={setRowBeingDeletedId}
        rowIndex={rowIndex}
        columns={columns}
        firebaseRowId={firebaseId}
        rowData={data[firebaseId]}
        onRowUpdateComplete={rowEdits}
        onRowDelete={rowDelete}
        infoRow={infoRow}
        infoRowOpenedFirebaseId={infoRowOpenedId}
        setInfoRowOpenedFirebaseId={setInfoRowOpenedId}
        infoRowVaribles={infoRowVaribles}
        infoRowEditComponent={infoRowEditComponent}
        showActions={showActions}
      />
    );
  };

  return (
    <PerfectScrollbar>
      <Table data-testid="full-table">
        <TableHead>
          <TableRow>
            {showActions && (rowEdits || rowDelete) && (
              <TableCell data-testid="column-action">Action</TableCell>
            )}
            {columns.map((item, index) => (
              <TableCell data-testid={"column-" + index} key={index}>
                {item.title}
              </TableCell>
            ))}
            {infoRow && <TableCell data-testid={"column-collapse"} />}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            (order
              ? Object.keys(data)
                  .sort(getComparator(order.direction, order.column))
                  .map((firebaseId, indexRow) => row(firebaseId, indexRow))
              : Object.keys(data).map((firebaseId, indexRow) => row(firebaseId, indexRow)))}
        </TableBody>
      </Table>
    </PerfectScrollbar>
  );
};

DashboardTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.string, field: PropTypes.string, type: PropTypes.string })
  ),
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
  action: PropTypes.arrayOf(PropTypes.shape({ icon: PropTypes.string, onClick: PropTypes.func })),
  rowEdits: PropTypes.func,
  rowDelete: PropTypes.func,
  order: PropTypes.shape({
    column: PropTypes.string,
    direction: PropTypes.oneOfType[("desc", "asc")],
  }),
  infoRow: PropTypes.func,
  infoRowVaribles: PropTypes.arrayOf(PropTypes.string),
  infoRowEditComponent: PropTypes.func,
  showActions: PropTypes.bool,
};
