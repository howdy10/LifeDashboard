import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import React from "react";
import { StandardTextFieldProps } from "@mui/material";

export interface textFormProps extends StandardTextFieldProps {
  name: string;
  control: any;
  label: any;
  rules?: any;
}

export const FormInputText = ({ name, control, label, rules, ...props }: textFormProps) => {
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
