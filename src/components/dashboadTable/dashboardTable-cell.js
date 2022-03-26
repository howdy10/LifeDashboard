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
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export const DashboardTableCell = ({
  rowBeingEdited,
  indexColumn,
  indexRow,
  idRow,
  columnName,
  isColumnEditable,
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
        return value ? format(value, "MM/dd/yyyy") : "N/A";
      case "boolean":
        return value ? (
          <CheckIcon color="success" data-testid="check-icon" />
        ) : (
          <CloseIcon color="error" data-testid="close-icon" />
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
              onUpdateValue(parseFloat(event.target.value));
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
        return (
          <FormGroup aria-label="position" row>
            <FormControlLabel
              control={
                <Switch
                  checked={value}
                  onChange={(event) => {
                    onUpdateValue(event.target.checked);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label=""
            />
          </FormGroup>
        );
      default:
        return (
          <TextField
            fullWidth
            required
            label={columnName}
            value={value}
            onChange={(event) => {
              onUpdateValue(event.target.value);
            }}
            variant="outlined"
          />
        );
    }
  };

  if (rowBeingEdited === indexRow && isColumnEditable) {
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
DashboardTableCell.defaultProps = {
  isColumnEditable: true,
};

DashboardTableCell.propTypes = {
  isColumnEditable: PropTypes.bool,
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
