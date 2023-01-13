import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { InsuranceDeductable } from "./insurance-deductable";
import { insuranceDb } from "../../hooks/insurance";
import { forEachFirebase } from "../../firebase/utils";

interface InsuranceBoardInput {
  insurance: insuranceDb;
}
export const InsuranceBoard = ({ insurance, ...rest }: InsuranceBoardInput) => {
  const [claimsAmount, setClaimsAmount] = useState(0);

  useEffect(() => {
    let totalPaid = 0;
    if (insurance.claims) {
      forEachFirebase(insurance.claims, (value) => (totalPaid += value.cost));
    }

    setClaimsAmount(totalPaid);
  }, [insurance]);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <InsuranceDeductable
          paid={claimsAmount}
          deductible={insurance.deductible}
          outOfPocket={insurance.outOfPocket}
        />
      </Grid>
    </Grid>
  );
};
