import React, { useState } from "react";
import { IconButton, Menu, MenuItem, TableCell, ListItemIcon, ListItemText } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export interface RowEditMenuProps {
  isBeingEdited: boolean;
  isBeingDeleted: boolean;
  rowIndex: number;
  firebaseRowId: any;
  confirmRowEdit: any;
  confirmRowDelete: any;
  cancelRowEdit: any;
  editButtonClicked: any;
  deleteButtonClicked: any;
  canEdit: boolean;
  canDelete: boolean;
}

export const RowEditMenu = ({
  isBeingEdited,
  isBeingDeleted,
  rowIndex,
  firebaseRowId,
  confirmRowEdit,
  confirmRowDelete,
  cancelRowEdit,
  editButtonClicked,
  deleteButtonClicked,
  canEdit,
  canDelete,
}: RowEditMenuProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isBeingEdited || isBeingDeleted) {
    return (
      <TableCell data-testid={"cell-" + rowIndex + "-action"}>
        <IconButton
          data-testid="fab-action-confirm"
          onClick={() => {
            if (isBeingEdited) {
              confirmRowEdit(firebaseRowId);
            } else if (isBeingDeleted) {
              confirmRowDelete(firebaseRowId);
            }
          }}
        >
          <CheckIcon data-testid={"cell-action-confirm"} />
        </IconButton>
        <IconButton
          data-testid="fab-action-cancel"
          onClick={() => {
            cancelRowEdit();
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
        editButtonClicked(firebaseRowId);
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
        deleteButtonClicked(firebaseRowId);
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
        {canEdit && EditIconButton}
        {canDelete && DeleteIconButton}
      </Menu>
    </TableCell>
  );
};
