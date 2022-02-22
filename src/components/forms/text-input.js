import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import React from "react";

export const FormInputText = ({ name, control, label, rules, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          {...props}
          label={label}
          error={!!error}
          variant="outlined"
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};
