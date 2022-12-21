import { Box } from "@mui/system";
import { format } from "date-fns";
import { MoneyFormatter } from "../dataDisplay/numberFormatter";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export interface TableCellDataFormatProps {
  value: any;
  type: string;
}

export const TableCellDataFormat = ({ type, value }: TableCellDataFormatProps) => {
  switch (type) {
    case "currency":
      return MoneyFormatter(value);
    case "nullCurrency":
      return value ? MoneyFormatter(value) : "N/A";
    case "date":
      return value ? format(value, "MM/dd/yyyy") : "N/A";
    case "boolean":
      return value ? (
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          <CheckIcon color="success" data-testid="check-icon" />
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          <CloseIcon color="error" data-testid="close-icon" />
        </Box>
      );
    default:
      return value ?? " ";
  }
};
