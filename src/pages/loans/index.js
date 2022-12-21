import { Grid } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebase } from "../../firebase/clientApp";
import { AllLoansUrl } from "../../firebase/databaseLinks";
import { LoanSummary } from "../../components/loans/loan-summary";
import { DashboardContainer } from "../../components/dashboard-container";

export const Loans = () => {
  const database = getDatabase(firebase);
  const [loans, loading, error] = useObjectVal(ref(database, AllLoansUrl()));

  return (
    <DashboardContainer title={"All Loans"}>
      <Grid container spacing={3}>
        {loans &&
          Object.keys(loans).map((id, index) => (
            <Grid item md={6} sm={12} xs={12} key={index}>
              <LoanSummary loan={loans[id]} loanId={id} />
            </Grid>
          ))}
      </Grid>
    </DashboardContainer>
  );
};

Loans.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Loans;
