import Head from "next/head";
import { useEffect, useContext } from "react";
import { Box, Container } from "@mui/material";
import { CarloanBoard } from "src/components/carloan/carloan-board";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import { InsuranceClaims } from "src/components/insurance/insurance-claims";
import { ref, getDatabase } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";
import { firebase } from "../firebase/clientApp";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { userContext } from "../context/userContext";
import { getAuth } from "firebase/auth";
import { InsuranceBoard } from "../components/insurance/insurance-board";

export const Insurance = () => {
  const database = getDatabase(firebase);

  const auth = getAuth();
  const user = auth.currentUser;

  const [snapshot, loading, error] = useObject(
    ref(database, "users/" + user?.uid + "/HealthInsurance")
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Head>
        <title>Insurance</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          {!loading && snapshot && <InsuranceBoard insurance={snapshot.val()} />}
          <Box sx={{ mt: 3 }}>{snapshot && <InsuranceClaims claims={snapshot.val().claims} />}</Box>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};
Insurance.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Insurance;
