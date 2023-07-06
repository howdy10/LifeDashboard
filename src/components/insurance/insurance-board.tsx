import { Grid } from "@mui/material";
import { InsuranceDeductable } from "./insurance-deductable";
import { InsuranceMemberBreakdown } from "./insurance-memberBreakdown";
import { insuranceInfo } from "../../hooks/insurance";
import { InsuranceBalance } from "./insurance-balance";

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
      <Grid item sm={6} xs={12}>
        <InsuranceMemberBreakdown
          paid={insurance.totalPaid}
          deductible={insurance.deductible}
          outOfPocket={insurance.outOfPocket}
          year={year}
          members={insurance.memberBalance}
        />
      </Grid>

      <Grid item sm={6} xs={12}>
        <InsuranceBalance
          paid={insurance.totalPaid}
          deductible={insurance.deductible}
          outOfPocket={insurance.outOfPocket}
          remaining={insurance.balanceRemaining}
        />
      </Grid>
    </Grid>
  );
};
