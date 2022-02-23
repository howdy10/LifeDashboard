import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export const FormInputDropdown = ({ name, control, label, options, rules, ...props }) => {
  const generateSelectOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      );
    });
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl {...props} error={!!error}>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select onChange={onChange} value={value} label={label}>
            <MenuItem key={-1} value={0}>
              Please Select
            </MenuItem>
            {generateSelectOptions()}
          </Select>
        </FormControl>
      )}
    />
  );
};
