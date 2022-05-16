import React, { useEffect, useState } from "react";
import { IconButton, Collapse, TableCell, TableRow, Typography } from "@mui/material";
import { DashboardTableCell } from "./dashboardTable-cell";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { RowEditMenu } from "./dashboardTable-row-EditMenu";

export interface DashboardTableRowProps {
  rowData;
  columns;
  rowIndex;
  firebaseRowId;
  isRowBeingEdited: boolean;
  isRowBeingDeleted: boolean;
  setRowBeingEditedFirebaseId: any;
  setRowBeingDeletedFirebaseId: any;
  onRowUpdateComplete: any;
  onRowDelete: any;
  infoRow;
  infoRowEditComponent;
  isInfoRowOpened: boolean;
  setInfoRowOpenedFirebaseId: any;
  infoRowVaribles;
  showActions: boolean;
}
export const DashboardTableRow = ({
  rowData,
  columns,
  rowIndex,
  firebaseRowId,
  isRowBeingEdited,
  isRowBeingDeleted,
  setRowBeingEditedFirebaseId,
  setRowBeingDeletedFirebaseId,
  onRowUpdateComplete,
  onRowDelete,
  infoRow,
  infoRowEditComponent,
  isInfoRowOpened,
  setInfoRowOpenedFirebaseId,
  infoRowVaribles,
  showActions,
}: DashboardTableRowProps) => {
  const [localRowData, setLocalRowData] = useState(rowData);

  useEffect(() => {
    setLocalRowData(rowData);
  }, [rowData]);

  useEffect(() => {
    if (!showActions) {
      setLocalRowData({ ...rowData });
      setRowBeingDeletedFirebaseId(null);
      setRowBeingEditedFirebaseId(null);
    }
  }, [showActions]);

  const RowDeleteOrUpdateCleanup = () => {
    setLocalRowData({ ...rowData });
    setRowBeingEditedFirebaseId(null);
    setRowBeingDeletedFirebaseId(null);
  };

  return (
    <>
      <TableRow hover key={rowIndex} data-testid={"row-" + rowIndex}>
        {showActions && (onRowUpdateComplete || onRowDelete) && (
          <RowEditMenu
            firebaseRowId={firebaseRowId}
            isBeingDeleted={isRowBeingDeleted}
            isBeingEdited={isRowBeingEdited}
            rowIndex={rowIndex}
            editButtonClicked={(firebaseRowId) => setRowBeingEditedFirebaseId(firebaseRowId)}
            deleteButtonClicked={(firebaseRowId) => {
              setLocalRowData({ ...rowData });
              setRowBeingDeletedFirebaseId(firebaseRowId);
            }}
            confirmRowEdit={(firebaseRowId) => {
              onRowUpdateComplete(localRowData, rowData, firebaseRowId);
              RowDeleteOrUpdateCleanup();
            }}
            confirmRowDelete={(firebaseRowId) => {
              onRowDelete(rowData, firebaseRowId);
              RowDeleteOrUpdateCleanup();
            }}
            cancelRowEdit={RowDeleteOrUpdateCleanup}
            canEdit={onRowUpdateComplete}
            canDelete={onRowDelete}
          />
        )}
        {isRowBeingDeleted ? (
          <TableCell colSpan={columns.length}>
            <Typography>Are you sure you want to Delete this Entry?</Typography>
          </TableCell>
        ) : (
          columns.map((id, index) => (
            <DashboardTableCell
              key={index}
              isRowBeingEdited={isRowBeingEdited}
              indexColumn={index}
              indexRow={rowIndex}
              isColumnEditable={columns[index].edit}
              columnName={columns[index].title}
              type={columns[index].type}
              value={localRowData[columns[index].field]}
              columnOptions={columns[index].dropdownOptions}
              onUpdateValue={(value) => {
                const newData = { ...localRowData };
                newData[columns[index].field] = value;
                setLocalRowData(newData);
              }}
            />
          ))
        )}
        {infoRow && (
          <TableCell>
            <IconButton
              data-testid={"cell-" + rowIndex + "-collapseIcon"}
              aria-label="expand row"
              size="small"
              onClick={() => setInfoRowOpenedFirebaseId(isInfoRowOpened ? null : firebaseRowId)}
            >
              {isInfoRowOpened ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
      </TableRow>
      {infoRow && (
        <TableRow data-testid={"row-" + rowIndex + "-collapse"}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length + 1}>
            <Collapse in={isInfoRowOpened} timeout="auto" unmountOnExit>
              {isRowBeingEdited && infoRowEditComponent
                ? infoRowEditComponent(
                    infoRowVaribles?.map((x) => localRowData[x]),
                    (value, objectIndex) => {
                      const newData = { ...localRowData };
                      newData[infoRowVaribles[objectIndex]] = value;
                      setLocalRowData(newData);
                    }
                  )
                : infoRow(infoRowVaribles?.map((x) => localRowData[x]))}
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
