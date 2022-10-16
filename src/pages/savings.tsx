import { Grid } from "@mui/material";
import { SavingsBoard } from "../components/savings/savings-board";
import { DashboardLayout } from "../components/dashboard-layout";
import { SavingBucket } from "../components/savings/savings-bucket";
import { BucketsUrl } from "../firebase/databaseConstants";
import { LoadingComponent } from "../components/loading-component";
import { GetSavingsTotal } from "../hooks/savings";
import { GetFromDatabase } from "../hooks/baseHook";
import { DashboardContainer } from "../components/dashboard-container";

const Savings = () => {
  const [buckets, bucketsLoading, bucketsError] = GetFromDatabase(BucketsUrl);

  const [savings, savingsLoading, savingsError] = GetSavingsTotal();

  return (
    <DashboardContainer title={"Savings"}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <LoadingComponent loading={savingsLoading} error={savingsError}>
            <SavingsBoard savingsTotal={savings.amount} goalTotal={savings.goal} />
          </LoadingComponent>
        </Grid>

        <LoadingComponent loading={bucketsLoading} error={bucketsError}>
          {buckets && (
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <SavingBucket bucket={buckets["emergencyFund"]} bucketId={"emergencyFund"} />
            </Grid>
          )}
        </LoadingComponent>
        <LoadingComponent loading={bucketsLoading} error={bucketsError}>
          {buckets &&
            Object.keys(buckets)
              .filter((x) => x !== "emergencyFund")
              .map(
                (id, index) =>
                  !buckets[id].completed && (
                    <Grid item xl={3} lg={3} sm={6} xs={12} key={index}>
                      <SavingBucket bucket={buckets[id]} bucketId={id} />
                    </Grid>
                  )
              )}
        </LoadingComponent>
      </Grid>
    </DashboardContainer>
  );
};

Savings.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Savings;
