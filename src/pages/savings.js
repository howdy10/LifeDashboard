import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { SavingsBoard } from "../components/savings/savings-board";
import { DashboardLayout } from "../components/dashboard-layout";
import { SavingBucket } from "../components/savings/savings-bucket";
import { ref, getDatabase, push, child, update } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebase } from "../firebase/clientApp";
import { EmergencyBucketUrl, BucketsUrl, DashboardUrl } from "../firebase/databaseLinks";
import { LoadingComponent } from "../components/loading-component";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useEffect, useState } from "react";
import { MoneyFormatter } from "../components/dataDisplay/numberFormatter";

const Savings = () => {
  const database = getDatabase(firebase);
  const dashboardUrl = DashboardUrl();

  const [snapshot, loading, error] = useObjectVal(ref(database, EmergencyBucketUrl()));
  const [buckets, bucketsLoading, bucketsError] = useObjectVal(ref(database, BucketsUrl()));

  const [savingsTotal, setSavingsTotal] = useState(0);
  const [goalTotal, setGoalTotal] = useState(0);
  const [updateDashboard, setUpdateDashboard] = useState(true);

  useEffect(() => {
    let savingsTotal = snapshot?.amount ?? 0;
    let goalTotal = snapshot?.goal ?? 0;
    if (buckets) {
      Object.keys(buckets).map((key, index) => (savingsTotal += buckets[key].amount ?? 0));
      Object.keys(buckets).map((key, index) => (goalTotal += buckets[key].goal ?? 0));
    }
    setSavingsTotal(savingsTotal);
    setGoalTotal(goalTotal);

    //Update only if theres a differencr
    if (updateDashboard && snapshot && buckets) {
      let loanDashboard = {
        amount: savingsTotal,
        title: "Savings",
        type: "account",
      };
      const updates = {};
      updates[dashboardUrl + "/1"] = loanDashboard;
      update(ref(database), updates);
      // setUpdateDashboard(false);
    }
  }, [snapshot, buckets]);

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
            <Grid item xs={12}>
              <SavingsBoard savingsTotal={savingsTotal} goalTotal={goalTotal} />
            </Grid>
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
