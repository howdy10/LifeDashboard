import React, { FC, useEffect, useState } from "react";
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
  IconButtonProps,
  Typography,
  Grid,
} from "@mui/material";
import { DashboardTableRow } from "./dashboardTable-row";

export interface DashboardTableColumn {
  title: string;
  field: string;
  type?: string;
}

export interface DashboardTableColumnOrder {
  column: string;
  direction: "desc" | "asc";
}

export interface DashboardTableProps {
  columns: DashboardTableColumn[];
  data: any[] | any;
  rowEdits?: (oldData: any, newData: any, index: string) => void;
  rowDelete?: (oldData: any, index: string) => void;
  order?: DashboardTableColumnOrder;
  infoRow?;
  infoRowVaribles?: string[];
  infoRowEditComponent?;
  showActions?: boolean;
  showPagination?: boolean;
  showCount?: boolean;
}

export const DashboardTable: FC<DashboardTableProps> = ({
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
  showCount = false,
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
  }, [data, order, page]);

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
              let text: any = item.title;

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
                showFirstButton={true}
                showLastButton={true}
                nextIconButtonProps={
                  { "data-testid": "table-pagination-nextButton" } as IconButtonProps
                }
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
      {showCount && (
        <Grid container direction="row-reverse" sx={{ padding: "0 15px 5px 0" }}>
          <Grid item>
            <Typography variant="body2">{"Count: " + Object.keys(data).length}</Typography>
          </Grid>
        </Grid>
      )}
    </PerfectScrollbar>
  );
};
