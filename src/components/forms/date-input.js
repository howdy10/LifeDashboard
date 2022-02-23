import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
const DATE_FORMAT = "MM/dd/yyyy";

export const FormInputDate = ({ name, control, label, rules, ...props }) => {
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
