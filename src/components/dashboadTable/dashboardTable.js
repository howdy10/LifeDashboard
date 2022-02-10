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
}) => {
  const [rowBeingEdited, setRowBeingEdited] = useState(null);
  const [rowBeingDeleted, setRowBeingDeleted] = useState(null);
  const [infoRowOpened, setInfoRowOpened] = useState(null);

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

  const row = (item, indexRow) => {
    return (
      <DashboardTableRow
        key={indexRow}
        rowBeingEdited={rowBeingEdited}
        rowBeingDeleted={rowBeingDeleted}
        indexRow={indexRow}
        columns={columns}
        data={data}
        idRow={item}
        setRowBeingEdited={setRowBeingEdited}
        setRowBeingDeleted={setRowBeingDeleted}
        onRowUpdateComplete={rowEdits}
        onRowDelete={rowDelete}
        infoRow={infoRow}
        infoRowOpened={infoRowOpened}
        setInfoRowOpened={setInfoRowOpened}
        infoRowVaribles={infoRowVaribles}
      />
    );
  };

  return (
    <PerfectScrollbar>
      <Table data-testid="full-table">
        <TableHead>
          <TableRow>
            {(rowEdits || rowDelete) && <TableCell data-testid="column-action">Action</TableCell>}
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
                  .map((item, indexRow) => row(item, indexRow))
              : Object.keys(data).map((item, indexRow) => row(item, indexRow)))}
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
};
