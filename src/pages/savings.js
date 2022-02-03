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
import { SavingBucket } from "../components/savings/savings-bucket";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebase } from "../firebase/clientApp";
import { EmergencyBucketUrl, BucketsUrl } from "../firebase/databaseLinks";
import { LoadingComponent } from "../components/loading-component";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const Savings = () => {
  const database = getDatabase(firebase);

  const [snapshot, loading, error] = useObjectVal(ref(database, EmergencyBucketUrl()));
  const [buckets, bucketsLoading, bucketsError] = useObjectVal(ref(database, BucketsUrl()));
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Head>
        <title>Savings</title>
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
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <LoadingComponent loading={loading} error={error}>
                <SavingBucket bucket={snapshot} bucketId={"emergencyFund"} />
              </LoadingComponent>
            </Grid>
            <LoadingComponent loading={bucketsLoading} error={bucketsError}>
              {buckets &&
                Object.keys(buckets).map(
                  (id, index) =>
                    !buckets[id].completed && (
                      <Grid item xl={3} lg={3} sm={6} xs={12} key={index}>
                        <SavingBucket bucket={buckets[id]} bucketId={id} />
                      </Grid>
                    )
                )}
            </LoadingComponent>
          </Grid>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

Savings.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Savings;
