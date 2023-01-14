import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { InsuranceDeductable } from "./insurance-deductable";
import { insuranceInfo } from "../../hooks/insurance";
import { forEachFirebase } from "../../firebase/utils";

interface InsuranceBoardInput {
  insurance: insuranceInfo;
  year: number;
}
export const InsuranceBoard = ({ insurance, year, ...rest }: InsuranceBoardInput) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <InsuranceDeductable
          paid={insurance.totalPaid}
          deductible={insurance.deductible}
          outOfPocket={insurance.outOfPocket}
          year={year}
        />
      </Grid>
    </Grid>
  );
};
