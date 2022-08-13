import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { NumberFormatMoney } from "../dataDisplay/textField-MoneyFormat";

export interface TableCellEditProps {
  columnName: string;
  columnOptions?: any[];
  value: any;
  type: string;
  onUpdateValue: any;
}

export const TableCellEdit = ({
  columnName,
  value,
  onUpdateValue,
  columnOptions,
  type,
}: TableCellEditProps) => {
  switch (type) {
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
            inputComponent: NumberFormatMoney as any,
            inputMode: "numeric",
            //pattern: "[0-9]*",
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
