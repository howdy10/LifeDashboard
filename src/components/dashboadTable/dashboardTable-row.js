import React, { useEffect, useState } from "react";
import { Collapse, TableCell, TableRow, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { DashboardTableCell } from "./dashboardTable-cell";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export const DashboardTableRow = ({
  rowBeingEdited,
  rowBeingDeleted,
  indexRow,
  onRowUpdateComplete,
  onRowDelete,
  data,
  columns,
  idRow,
  setRowBeingEdited,
  setRowBeingDeleted,
  infoRow,
  infoRowOpened,
  setInfoRowOpened,
  infoRowVaribles,
}) => {
  const [rowData, setRowData] = useState(data[idRow]);

  useEffect(() => {
    setRowData(data[idRow]);
  }, [data]);
  const renderRowEditIcons = (index) => {
    if (rowBeingEdited === index || rowBeingDeleted === index) {
      return (
        <TableCell data-testid={"cell-" + index + "-action"}>
          <IconButton
            data-testid="fab-action-confirm"
            onClick={() => {
              if (rowBeingEdited === index) {
                onRowUpdateComplete(rowData, data[idRow], idRow);
              } else if (rowBeingDeleted === index) {
                onRowDelete(data[idRow], idRow);
              }
              setRowData({ ...data[idRow] });
              setRowBeingEdited(null);
              setRowBeingDeleted(null);
            }}
          >
            <CheckIcon data-testid={"cell-action-confirm"} />
          </IconButton>
          <IconButton
            data-testid="fab-action-cancel"
            onClick={() => {
              setRowData({ ...data[idRow] });
              setRowBeingEdited(null);
              setRowBeingDeleted(null);
            }}
          >
            <CloseIcon data-testid={"cell-action-cancel"} />
          </IconButton>
        </TableCell>
      );
    }

    let EditIconButton = (
      <IconButton
        data-testid="fab-action-edit"
        onClick={() => {
          setRowBeingEdited(index);
        }}
      >
        <EditIcon data-testid={"cell-action-edit"} />
      </IconButton>
    );

    let DeleteIconButton = (
      <IconButton
        data-testid="fab-action-delete"
        onClick={() => {
          setRowData({ ...data[idRow] });
          setRowBeingDeleted(index);
        }}
      >
        <DeleteForeverIcon data-testid={"cell-action-delete"} />
      </IconButton>
    );
    return (
      <TableCell data-testid={"cell-" + index + "-action"}>
        {onRowUpdateComplete && EditIconButton}
        {onRowDelete && DeleteIconButton}
      </TableCell>
    );
  };

  return (
    <>
      <TableRow hover key={indexRow} data-testid={"row-" + indexRow}>
        {(onRowUpdateComplete || onRowDelete) && renderRowEditIcons(indexRow)}
        {rowBeingDeleted === indexRow ? (
          <TableCell colSpan={6}>
            <Typography>Are you sure you want to Delete this transaction?</Typography>
          </TableCell>
        ) : (
          Object.keys(rowData)
            .filter((id, index) => columns[index])
            .map((id, index) => (
              <DashboardTableCell
                key={index}
                rowBeingEdited={rowBeingEdited}
                indexColumn={index}
                indexRow={indexRow}
                idRow={idRow}
                columnName={columns[index].title}
                type={columns[index].type}
                value={rowData[columns[index].field]}
                onUpdateValue={(value) => {
                  const newData = { ...rowData };
                  newData[columns[index].field] = value;
                  setRowData(newData);
                }}
              />
            ))
        )}
        {infoRow && (
          <TableCell>
            <IconButton
              data-testid={"cell-" + indexRow + "-collapseIcon"}
              aria-label="expand row"
              size="small"
              onClick={() => setInfoRowOpened(indexRow === infoRowOpened ? null : indexRow)}
            >
              {infoRowOpened === indexRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
      </TableRow>
      {infoRow && (
        <TableRow data-testid={"row-" + indexRow + "-collapse"}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={infoRowOpened === indexRow} timeout="auto" unmountOnExit>
              {infoRow(infoRowVaribles?.map((x) => rowData[x]))}
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
