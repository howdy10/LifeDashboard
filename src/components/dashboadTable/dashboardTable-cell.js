import React, { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { TableCell } from "@mui/material";
import { format } from "date-fns";
import { MoneyFormatter } from "../dataDisplay/numberFormatter";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

export const DashboardTableCell = ({
  rowBeingEdited,
  indexColumn,
  indexRow,
  idRow,
  columnName,
  type,
  value,
  onUpdateValue,
}) => {
  const [submittionAttempt, setSubmittionAttempt] = useState(false);
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

  const renderDataEdit = (param, value) => {
    switch (param) {
      case "currency":
      case "nullCurrency":
        return (
          <TextField
            fullWidth
            required
            error={isNaN(value)}
            label={columnName}
            value={value}
            onChange={(event) => {
              onUpdateValue(parseInt(event.target.value));
            }}
            name="amount"
            id="amount-input"
            InputProps={{
              inputComponent: NumberFormatCustom,
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            variant="outlined"
          />
        );
      case "date":
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label={columnName}
              value={value}
              onChange={(newValue) => {
                onUpdateValue(newValue);
              }}
              renderInput={(params) => {
                params.error = value === null;
                return <TextField fullWidth error={true} {...params} />;
              }}
            />
          </LocalizationProvider>
        );
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

  if (rowBeingEdited === indexRow) {
    return (
      <TableCell data-testid={"cell-" + indexRow + "-" + indexColumn} key={indexColumn}>
        {renderDataEdit(type, value)}
      </TableCell>
    );
  } else {
    return (
      <TableCell data-testid={"cell-" + indexRow + "-" + indexColumn} key={indexColumn}>
        {renderDataFormat(type, value)}
      </TableCell>
    );
  }
};

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
