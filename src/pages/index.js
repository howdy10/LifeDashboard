import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Budget } from "../components/dashboard/budget";
import { LoanProgress } from "../components/dashboard/loan-progress";
import { DashboardLayout } from "../components/dashboard-layout";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebase } from "../firebase/clientApp";
import { DashboardUrl } from "../firebase/databaseLinks";
import { LoadingComponent } from "../components/loading-component";
import { AccountBalance } from "../components/dashboard/account-balance";
import { SavingsBalance } from "src/components/dashboard/savings-balance";
import { InsuranceProgress } from "src/components/dashboard/insurance-progress";

const CardResolver = ({ card }) => {
  switch (card.type) {
    case "loan":
      return <LoanProgress loanId={card.loanId} />;
    default:
      return "No card type for " + card.type;
  }
};

const Dashboard = () => {
  const database = getDatabase(firebase);

  const [cards, loading, error] = useObjectVal(ref(database, DashboardUrl()));
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
            <Grid item xl={3} lg={6} md={6} sm={12} xs={12}>
              <SavingsBalance sx={{ height: "100%" }} />
            </Grid>
            <Grid item xl={3} lg={6} md={6} sm={12} xs={12}>
              <InsuranceProgress sx={{ height: "100%" }} href="/insurance" />
            </Grid>
            <LoadingComponent loading={loading} error={error}>
              {cards &&
                Object.keys(cards).map((id, index) => (
                  <Grid item xl={3} lg={6} md={6} sm={12} xs={12}>
                    <CardResolver card={cards[id]} />
                  </Grid>
                ))}
            </LoadingComponent>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
