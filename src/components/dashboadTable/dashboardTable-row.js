import React, { useEffect, useState } from "react";
import {
  IconButton,
  Collapse,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { DashboardTableCell } from "./dashboardTable-cell";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
}) => {
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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderRowEditMenu = () => {
    if (isRowBeingEdited || isRowBeingDeleted) {
      return (
        <TableCell data-testid={"cell-" + rowIndex + "-action"}>
          <IconButton
            data-testid="fab-action-confirm"
            onClick={() => {
              if (isRowBeingEdited) {
                onRowUpdateComplete(localRowData, rowData, firebaseRowId);
              } else if (isRowBeingDeleted) {
                onRowDelete(rowData, firebaseRowId);
              }
              setLocalRowData({ ...rowData });
              setRowBeingEditedFirebaseId(null);
              setRowBeingDeletedFirebaseId(null);
            }}
          >
            <CheckIcon data-testid={"cell-action-confirm"} />
          </IconButton>
          <IconButton
            data-testid="fab-action-cancel"
            onClick={() => {
              setLocalRowData({ ...rowData });
              setRowBeingEditedFirebaseId(null);
              setRowBeingDeletedFirebaseId(null);
            }}
          >
            <CloseIcon data-testid={"cell-action-cancel"} />
          </IconButton>
        </TableCell>
      );
    }

    let EditIconButton = (
      <MenuItem
        data-testid="fab-action-edit"
        onClick={() => {
          handleClose();
          setRowBeingEditedFirebaseId(firebaseRowId);
        }}
      >
        <ListItemIcon>
          <EditIcon data-testid={"cell-action-edit"} />
        </ListItemIcon>
        <ListItemText>Edit</ListItemText>
      </MenuItem>
    );

    let DeleteIconButton = (
      <MenuItem
        data-testid="fab-action-delete"
        onClick={() => {
          handleClose();
          setLocalRowData({ ...rowData });
          setRowBeingDeletedFirebaseId(firebaseRowId);
        }}
      >
        <ListItemIcon>
          <DeleteForeverIcon data-testid={"cell-action-delete"} />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    );
    return (
      <TableCell data-testid={"cell-" + rowIndex + "-action"}>
        <IconButton
          aria-label="more"
          id="long-button"
          data-testid="action-menu-icon"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {onRowUpdateComplete && EditIconButton}
          {onRowDelete && DeleteIconButton}
        </Menu>
      </TableCell>
    );
  };

  return (
    <>
      <TableRow hover key={rowIndex} data-testid={"row-" + rowIndex}>
        {showActions && (onRowUpdateComplete || onRowDelete) && renderRowEditMenu()}
        {isRowBeingDeleted ? (
          <TableCell colSpan={columns.length}>
            <Typography>Are you sure you want to Delete this Entry?</Typography>
          </TableCell>
        ) : (
          Object.keys(localRowData)
            .filter((id, index) => columns[index])
            .map((id, index) => (
              <DashboardTableCell
                key={index}
                isRowBeingEdited={isRowBeingEdited}
                indexColumn={index}
                indexRow={rowIndex}
                isColumnEditable={columns[index].edit}
                columnName={columns[index].title}
                type={columns[index].type}
                value={localRowData[columns[index].field]}
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
