import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { IncomeForm } from "../components/taxes/taxes-form";
import { TaxResults } from "../components/taxes/taxes-results";
import { DashboardContainer } from "../components/dashboard-container";

export interface Income {
  income: number;
  fedWithheld: number;
  preTaxDeductions: number;
}

export const TaxEstimator = () => {
  const [income, setIncome] = useState<Income>(null);
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
