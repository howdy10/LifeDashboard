import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { InsuranceDeductable } from "./insurance-deductable";

export const InsuranceBoard = ({ insurance, ...rest }) => {
  const [claimsAmount, setClaimsAmount] = useState(0);

  useEffect(() => {
    let totalPaid = 0;

    if (insurance.claims) {
      Object.keys(insurance.claims).map((key, index) => (totalPaid += insurance.claims[key].cost));
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
