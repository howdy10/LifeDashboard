import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { getDatabase } from "firebase/database";
import { firebase } from "../firebase/clientApp";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { BalanceBoard } from "src/components/balance/balance-board";

export const Balance = () => {
  const database = getDatabase(firebase);
  const today = new Date();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Head>
        <title>Balance</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <BalanceBoard month={today.getMonth()} year={today.getFullYear()} />
        </Container>
      </Box>
    </LocalizationProvider>
  );
};
Balance.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Balance;
