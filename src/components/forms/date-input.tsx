import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
const DATE_FORMAT = "MM/dd/yyyy";

export interface dateFormProps {
  name: string;
  control: any;
  label: any;
  rules?: any;
}

export const FormInputDate = ({ name, control, label, rules }: dateFormProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DatePicker
            label={label}
            value={value}
            onChange={onChange}
            renderInput={(params) => {
              return <TextField fullWidth {...params} />;
            }}
            inputFormat={DATE_FORMAT}
          />
        )}
      />
    </LocalizationProvider>
  );
};
