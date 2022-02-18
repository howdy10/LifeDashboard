import { useEffect, useState } from "react";
import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebase } from "../../firebase/clientApp";
import { AllLoansUrl } from "src/firebase/databaseLinks";
import { LoanSummary } from "src/components/loans/loan-summary";

export const Loans = () => {
  const database = getDatabase(firebase);
  const [loans, loading, error] = useObjectVal(ref(database, AllLoansUrl()));

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {loans &&
            Object.keys(loans).map((id, index) => (
              <Grid item sm={6} xs={12} key={index}>
                <LoanSummary loan={loans[id]} loanId={id} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

Loans.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Loans;
