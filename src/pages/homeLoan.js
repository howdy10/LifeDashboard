import Head from "next/head";
import { useEffect, useContext } from "react";
import { Box, Container } from "@mui/material";
import { HomeloanBoard } from "src/components/homeloan/homeloan-board";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import { HomeloanTransactions } from "src/components/homeloan/homeloan-transactions";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebase } from "../firebase/clientApp";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { HomeLoanUrl } from "../firebase/databaseLinks";

export const HomeLoan = () => {
  // Get a reference to the database service
  const database = getDatabase(firebase);

  const [snapshot, loading, error] = useObjectVal(ref(database, HomeLoanUrl()));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Head>
        <title>Home Loan</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          {!loading && snapshot && <HomeloanBoard loan={snapshot} />}
          <Box sx={{ mt: 3 }}>
            {snapshot && <HomeloanTransactions loan={snapshot} customers={customers} />}
          </Box>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};
HomeLoan.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default HomeLoan;
