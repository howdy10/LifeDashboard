import React from "react";
import { FormControl, FormControlTypeMap, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";

export interface DropDownFormProps<T> extends DefaultComponentProps<FormControlTypeMap> {
  name: string;
  control: any;
  label: any;
  options: T[];
  rules?: any;
}

export const FormInputDropdown = ({
  name,
  control,
  label,
  options,
  rules,
  ...props
}: DropDownFormProps<any>) => {
  const generateSelectOptions = () => {
    return options.map((option: any) => {
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
