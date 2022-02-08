import React from "react";
import { PropTypes } from "prop-types";
import { format } from "date-fns";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Table, TableBody, Fab, TableCell, TableHead, TableRow } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { MoneyFormatter } from "../dataDisplay/numberFormatter";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const DashboardTable = ({ columns, data, action }) => {
  const renderDataFormat = (param, value) => {
    switch (param) {
      case "currency":
        return MoneyFormatter(value);
      case "nullCurrency":
        return value ? MoneyFormatter(value) : "N/A";
      case "date":
        return format(value, "MM/dd/yyyy");
      case "boolean":
        return value ? (
          <CheckIcon data-testid="check-icon" />
        ) : (
          <CloseIcon data-testid="close-icon" />
        );
      default:
        return value;
    }
  };

  const renderActionCell = (actionList, index, id) => {
    let actionIcons = actionList.map((x) => {
      switch (x.icon) {
        case "edit":
          return (
            <Fab
              data-testid={"fab-action-edit"}
              color="primary"
              size="small"
              onClick={(event) => {
                if (x.onClick) {
                  x.onClick(event, id);
                }
              }}
            >
              <EditIcon data-testid={"cell-action-edit"} />
            </Fab>
          );
        case "delete":
          return (
            <Fab
              data-testid={"fab-action-delete"}
              color="primary"
              size="small"
              onClick={(event) => {
                if (x.onClick) {
                  x.onClick(event, id);
                }
              }}
            >
              <DeleteForeverIcon data-testid={"cell-action-delete"} />
            </Fab>
          );
        default:
          return "";
      }
    });
    return <TableCell data-testid={"cell-" + index + "-action"}>{actionIcons}</TableCell>;
  };

  return (
    <PerfectScrollbar>
      <Table data-testid="full-table">
        <TableHead>
          <TableRow>
            {columns.map((item, index) => (
              <TableCell data-testid={"column-" + index} key={index}>
                {item.title}
              </TableCell>
            ))}
            {action && <TableCell data-testid="column-action">Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            Object.keys(data).map((item, indexRow) => (
              <TableRow hover key={indexRow} data-testid={"row-" + indexRow}>
                {Object.keys(data[item])
                  .filter((id, index) => columns[index])
                  .map((id, index) => (
                    <TableCell data-testid={"cell-" + indexRow + "-" + index} key={index}>
                      {renderDataFormat(columns[index].type, data[item][columns[index].field])}
                    </TableCell>
                  ))}
                {action && renderActionCell(action, indexRow, item)}
              </TableRow>
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
  data: PropTypes.arrayOf(PropTypes.object),
  action: PropTypes.arrayOf(PropTypes.shape({ icon: PropTypes.string, onClick: PropTypes.func })),
};
