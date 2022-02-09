import React, { useState } from "react";
import { PropTypes } from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { DashboardTableRow } from "./dashboardTable-row";

export const DashboardTable = ({ columns, data, rowEdits, rowDelete }) => {
  const [rowBeingEdited, setRowBeingEdited] = useState(null);
  const [rowBeingDeleted, setRowBeingDeleted] = useState(null);

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
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            Object.keys(data).map((item, indexRow) => (
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
              />
            ))}
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
};
