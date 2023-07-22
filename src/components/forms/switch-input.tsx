import React, { useEffect, useState } from "react";
import { FormControl, FormControlLabel, Switch } from "@mui/material";
import { Controller } from "react-hook-form";

export interface SwitchFormProps<T> {
  name: string;
  control: any;
  label?: any;
  setValue: any;
  options: T[];
  rules?: any;
}

export const FormInputSwitch = ({ name, control, setValue, options }: SwitchFormProps<any>) => {
  const [selectedItems, setSelectedItems] = useState([]);

  // we are handling the selection manually here
  const handleSelect = (value: any) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems) => [...prevItems, value]);
    }
  };

  // we are setting form value manually here
  useEffect(() => {
    setValue(name, selectedItems);
  }, [selectedItems]);

  return (
    <FormControl size={"small"} variant={"outlined"}>
      <div>
        {options.map((option) => {
          return (
            <FormControlLabel
              control={
                <Controller
                  name={name}
                  render={({}) => {
                    return (
                      <Switch
                        checked={selectedItems.includes(option.value)}
                        onChange={() => handleSelect(option.value)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    );
                  }}
                  control={control}
                />
              }
              label={option.label}
              key={option.value}
            />
          );
        })}
      </div>
    </FormControl>
  );
};
