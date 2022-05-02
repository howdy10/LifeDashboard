import { DashboardLayout } from "../components/dashboard-layout";
import { NetWorthForm } from "src/components/netWorth/netWorth-input";
import { NetWorthPie } from "src/components/netWorth/netWorth-pie";
import { DashboardContainer } from "src/components/dashboard-container";
import { Grid } from "@mui/material";

export const NetWorth = () => {
  const today = new Date();

  return (
    <DashboardContainer title={"Net Worth"}>
      <Grid container spacing={3}>
        <Grid item lg={6} xs={12}>
          <NetWorthForm />
        </Grid>
        <Grid item lg={6} xs={12}>
          <NetWorthPie />
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};
NetWorth.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default NetWorth;
