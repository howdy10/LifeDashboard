import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Budget } from "../components/dashboard/budget";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Sales } from "../components/dashboard/sales";
import { TasksProgress } from "../components/dashboard/tasks-progress";
import { LoanProgress } from "../components/dashboard/loan-progress";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { TotalProfit } from "../components/dashboard/total-profit";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../components/dashboard-layout";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebase } from "../firebase/clientApp";
import { DashboardUrl } from "../firebase/databaseLinks";
import { LoadingComponent } from "../components/loading-component";
import { AccountBalance } from "../components/dashboard/account-balance";
import { InsuranceProgress } from "src/components/dashboard/insurance-progress";

const Dashboard = () => {
  const database = getDatabase(firebase);

  const [snapshot, loading, error] = useObjectVal(ref(database, DashboardUrl()));
  return (
    <>
      <Head>
        <title>Life Dashboard</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <LoadingComponent loading={loading} error={error}>
                {snapshot && (
                  <AccountBalance href="/savings" account={snapshot[1]} sx={{ height: "100%" }} />
                )}
              </LoadingComponent>
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <LoadingComponent loading={loading} error={error}>
                {snapshot && <LoanProgress href="/carLoan" loan={snapshot[0]} />}
              </LoadingComponent>
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <InsuranceProgress sx={{ height: "100%" }} href="/insurance" />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget />
            </Grid>
            {/* <Grid item lg={8} md={12} xl={9} xs={12}>
              <Sales />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <TrafficByDevice sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <LatestProducts sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestOrders />
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
