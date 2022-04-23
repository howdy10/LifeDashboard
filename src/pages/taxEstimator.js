import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { IncomeForm } from "src/components/taxes/taxes-form";
import { TaxResults } from "src/components/taxes/taxes-results";
import { DashboardContainer } from "src/components/dashboard-container";

export const TaxEstimator = () => {
  const [income, setIncome] = useState(null);
  const [taxableIncome, setTaxableIncome] = useState(0);
  useEffect(() => {
    if (income) {
      let calculate = income.income - income.preTaxDeductions;
      console.log(calculate);
      console.log(income);
      setTaxableIncome(calculate);
    }
  }, [income]);
  return (
    <DashboardContainer title={"Tax Estimator"}>
      <Grid container spacing={3}>
        <Grid item lg={6} xs={12}>
          <IncomeForm setIncome={setIncome} />
        </Grid>
        <Grid item lg={6} xs={12}>
          <TaxResults income={income} />
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};
TaxEstimator.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default TaxEstimator;
