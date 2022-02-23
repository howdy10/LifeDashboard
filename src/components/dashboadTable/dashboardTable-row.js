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
  infoRowEditComponent,
  infoRowOpened,
  setInfoRowOpened,
  infoRowVaribles,
}) => {
  const [rowData, setRowData] = useState(data[idRow]);

  useEffect(() => {
    setRowData(data[idRow]);
  }, [data]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderRowEditMenu = (index) => {
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
      <MenuItem
        data-testid="fab-action-edit"
        onClick={() => {
          handleClose();
          setRowBeingEdited(index);
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
          setRowData({ ...data[idRow] });
          setRowBeingDeleted(index);
        }}
      >
        <ListItemIcon>
          <DeleteForeverIcon data-testid={"cell-action-delete"} />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    );
    return (
      <TableCell data-testid={"cell-" + index + "-action"}>
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
      <TableRow hover key={indexRow} data-testid={"row-" + indexRow}>
        {(onRowUpdateComplete || onRowDelete) && renderRowEditMenu(indexRow)}
        {rowBeingDeleted === indexRow ? (
          <TableCell colSpan={6}>
            <Typography>Are you sure you want to Delete this Entry?</Typography>
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
                isColumnEditable={columns[index].edit}
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
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length + 1}>
            <Collapse in={infoRowOpened === indexRow} timeout="auto" unmountOnExit>
              {rowBeingEdited === indexRow && infoRowEditComponent
                ? infoRowEditComponent(
                    infoRowVaribles?.map((x) => rowData[x]),
                    (value, objectIndex) => {
                      const newData = { ...rowData };
                      newData[infoRowVaribles[objectIndex]] = value;
                      setRowData(newData);
                    }
                  )
                : infoRow(infoRowVaribles?.map((x) => rowData[x]))}
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
