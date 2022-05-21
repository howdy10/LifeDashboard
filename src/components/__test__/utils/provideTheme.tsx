import React, { ReactElement } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../../theme";

export const ProvideTheme = (ui: ReactElement): ReactElement => {
  return <ThemeProvider theme={theme}>{ui}</ThemeProvider>;
};
