import Head from "next/head";
import { useEffect, useContext } from "react";
import { Box, Container } from "@mui/material";
import { CarloanBoard } from "src/components/carloan/carloan-board";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import { CarloanTransactions } from "src/components/carloan/carloan-transactions";
import { ref, getDatabase } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";
import { firebase } from "../firebase/clientApp";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { userContext } from "../context/userContext";
import { getAuth } from "firebase/auth";

export const CarLoan = () => {
  // Get a reference to the database service
  const database = getDatabase(firebase);
  const auth = getAuth();
  const user = auth.currentUser;

  const [snapshot, loading, error] = useObject(ref(database, "users/" + user?.uid + "/Loans/0"));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Head>
        <title>Car Loan</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          {!loading && snapshot && <CarloanBoard loan={snapshot.val()} />}
          <Box sx={{ mt: 3 }}>
            {snapshot && <CarloanTransactions loan={snapshot.val()} customers={customers} />}
          </Box>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};
CarLoan.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CarLoan;
