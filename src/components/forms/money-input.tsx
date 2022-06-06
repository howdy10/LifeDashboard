import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { NumberFormatMoney } from "../dataDisplay/textField-MoneyFormat";
import { StandardTextFieldProps } from "@mui/material";

export interface MoneyFormProps extends StandardTextFieldProps {
  name: string;
  control: any;
  label: any;
  rules?: any;
}

export const FormInputMoney = ({ name, control, label, rules, ...props }) => {
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
          InputProps={{
            inputComponent: NumberFormatMoney as any,
            inputMode: "numeric",
            // pattern: "[0-9]*",
          }}
        />
      )}
    />
  );
};
