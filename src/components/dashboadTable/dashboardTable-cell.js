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
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box } from "@mui/system";

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
}) => {
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
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <CheckIcon color="success" data-testid="check-icon" />
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <CloseIcon color="error" data-testid="close-icon" />
          </Box>
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
      case "dropdown":
        return (
          <FormControl fullWidth>
            <InputLabel>{columnName}</InputLabel>
            <Select
              value={value ?? 0}
              label={columnName}
              onChange={(event) => {
                onUpdateValue(event.target.value);
              }}
            >
              <MenuItem key={-1} value={0}>
                Please Select
              </MenuItem>
              {columnOptions.map((x) => (
                <MenuItem key={x} value={x}>
                  {x}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

  if (isRowBeingEdited && isColumnEditable) {
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
