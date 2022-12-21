import { TableCell } from "@mui/material";
import { tableType } from "./dashboardTable-types";
import { TableCellDataFormat } from "./dashboardTable-cell-dataFormat";
import { TableCellEdit } from "./dashboardTable-cell-dataEdit";

export interface DashboardTableCellProps {
  indexColumn: number;
  indexRow: number;
  columnName: string;
  isRowBeingEdited: boolean;
  isColumnEditable: boolean;
  columnOptions: any[];
  type: tableType;
  value: any;
  onUpdateValue: any;
}

const defaultProps = {
  isColumnEditable: true,
};

export const DashboardTableCell = ({
  indexColumn,
  indexRow,
  columnName,
  isRowBeingEdited,
  isColumnEditable,
  columnOptions,
  type,
  value,
  onUpdateValue,
}: DashboardTableCellProps) => {
  if (isRowBeingEdited && isColumnEditable) {
    return (
      <TableCell data-testid={"cell-" + indexRow + "-" + indexColumn} key={indexColumn}>
        <TableCellEdit
          columnName={columnName}
          value={value}
          onUpdateValue={onUpdateValue}
          type={type}
          columnOptions={columnOptions}
        />
      </TableCell>
    );
  } else {
    return (
      <TableCell data-testid={"cell-" + indexRow + "-" + indexColumn} key={indexColumn}>
        <TableCellDataFormat type={type} value={value} />
      </TableCell>
    );
  }
};

DashboardTableCell.defaultProps = defaultProps;
