import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
} from "@mui/material";
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
  showPagination = false,
}) => {
  const [rowBeingEditedId, setRowBeingEditedId] = useState(null);
  const [rowBeingDeletedId, setRowBeingDeletedId] = useState(null);
  const [infoRowOpenedId, setInfoRowOpenedId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataListIdOrder, setDataListIdOrder] = useState([]);
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  useEffect(() => {
    if (!data) return;
    let filteredList = Object.keys(data);

    if (order) {
      filteredList = filteredList.sort(getComparator(order.direction, order.column));
    }
    if (showPagination) {
      filteredList = filteredList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }
    setDataListIdOrder(filteredList);
  }, [data, order]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Object.keys(data).length) : 0;

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
        isRowBeingEdited={rowBeingEditedId === firebaseId}
        isRowBeingDeleted={rowBeingDeletedId === firebaseId}
        setRowBeingEditedFirebaseId={setRowBeingEditedId}
        setRowBeingDeletedFirebaseId={setRowBeingDeletedId}
        rowIndex={rowIndex + rowsPerPage * page}
        columns={columns}
        firebaseRowId={firebaseId}
        rowData={localData[firebaseId]}
        onRowUpdateComplete={rowEdits}
        onRowDelete={rowDelete}
        infoRow={infoRow}
        isInfoRowOpened={infoRowOpenedId === firebaseId}
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
            {columns.map((item, index) => {
              let text = item.title;

              if (item.type === "boolean") {
                text = <Box sx={{ textAlign: "center" }}>{text}</Box>;
              }
              return (
                <TableCell data-testid={"column-" + index} key={index}>
                  {text}
                </TableCell>
              );
            })}
            {infoRow && <TableCell data-testid={"column-collapse"} />}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            localData &&
            dataListIdOrder.map((firebaseId, indexRow) => row(firebaseId, indexRow))}
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: 55 * emptyRows,
              }}
            >
              <TableCell colSpan={columns.length} />
            </TableRow>
          )}
        </TableBody>

        {showPagination && (
          <TableFooter>
            <TableRow>
              <TablePagination
                data-testid={"table-pagination"}
                rowsPerPageOptions={[5, 10, 25]}
                count={Object.keys(data).length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                nextIconButtonProps={{ "data-testid": "table-pagination-nextButton" }}
              />
            </TableRow>
          </TableFooter>
        )}
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
  showPagination: PropTypes.bool,
};
