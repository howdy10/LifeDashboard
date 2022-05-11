import { Grid } from "@mui/material";
import { LoanProgress } from "../components/dashboard/loan-progress";
import { DashboardLayout } from "../components/dashboard-layout";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebase } from "../firebase/clientApp";
import { DashboardUrl } from "../firebase/databaseLinks";
import { LoadingComponent } from "../components/loading-component";
import { SavingsBucketBalance } from "../components/dashboard/bucket-balance";
import { SavingsBalance } from "../components/dashboard/savings-balance";
import { InsuranceProgress } from "../components/dashboard/insurance-progress";
import { AccountBalance } from "../components/dashboard/account-balance";
import { DashboardContainer } from "../components/dashboard-container";

const CardResolver = ({ card }) => {
  switch (card.type) {
    case "loan":
      return <LoanProgress sx={{ height: "100%" }} loanId={card.loanId} />;
    case "savings":
      return <SavingsBucketBalance sx={{ height: "100%" }} bucketId={card.bucketId} />;
    default:
      return "No card type for " + card.type;
  }
};

const Dashboard = () => {
  const database = getDatabase(firebase);

  const [cards, loading, error] = useObjectVal(ref(database, DashboardUrl()));
  return (
    <DashboardContainer title={"Life Dashboard"}>
      <Grid container spacing={3}>
        <Grid item xl={3} lg={6} md={6} sm={12} xs={12}>
          <AccountBalance sx={{ height: "100%" }} />
        </Grid>
        <Grid item xl={3} lg={6} md={6} sm={12} xs={12}>
          <AccountBalance type="cc" sx={{ height: "100%" }} />
        </Grid>
        <Grid item xl={3} lg={6} md={6} sm={12} xs={12}>
          <SavingsBalance sx={{ height: "100%" }} />
        </Grid>
        <Grid item xl={3} lg={6} md={6} sm={12} xs={12}>
          <InsuranceProgress sx={{ height: "100%" }} href="/insurance" />
        </Grid>
        <LoadingComponent loading={loading} error={error}>
          {cards &&
            Object.keys(cards).map((id, index) => (
              <Grid key={index} item xl={3} lg={6} md={6} sm={12} xs={12}>
                <CardResolver card={cards[id]} />
              </Grid>
            ))}
        </LoadingComponent>
      </Grid>
    </DashboardContainer>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
