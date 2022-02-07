import React from "react";
import { PropTypes } from "prop-types";
import { format } from "date-fns";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { MoneyFormatter } from "../dataDisplay/numberFormatter";

export const DashboardTable = ({ columns, data }) => {
  const renderSwitch = (param, value) => {
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
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((item, indexRow) => (
              <TableRow hover key={indexRow} data-testid={"row-" + indexRow}>
                {Object.keys(item).map((id, index) => (
                  <TableCell data-testid={"cell-" + indexRow + "-" + index} key={index}>
                    {renderSwitch(columns[index].type, item[columns[index].field])}
                  </TableCell>
                ))}
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
};
