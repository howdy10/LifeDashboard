import { useContext } from "react";
import { Grid } from "@mui/material";
import { SavingsBoard } from "../components/savings/savings-board";
import { DashboardLayout } from "../components/dashboard-layout";
import { SavingBucket } from "../components/savings/savings-bucket";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebase } from "../firebase/clientApp";
import { EmergencyBucketUrl, BucketsUrl } from "../firebase/databaseConstants";
import { LoadingComponent } from "../components/loading-component";
import { GetSavingsTotal } from "src/hooks/savings";
import AppContext from "src/context/AppContext";
import { DashboardContainer } from "src/components/dashboard-container";

const Savings = () => {
  const database = getDatabase(firebase);
  const value = useContext(AppContext);

  const [snapshot, loading, error] = useObjectVal(
    ref(database, value.state.familyIdBaseUrl + EmergencyBucketUrl)
  );
  const [buckets, bucketsLoading, bucketsError] = useObjectVal(
    ref(database, value.state.familyIdBaseUrl + BucketsUrl)
  );

  const [savings, savingsLoading, savingsError] = GetSavingsTotal();

  return (
    <DashboardContainer title={"Savings"}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SavingsBoard savingsTotal={savings.amount} goalTotal={savings.goal} />
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
    </DashboardContainer>
  );
};

Savings.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Savings;
