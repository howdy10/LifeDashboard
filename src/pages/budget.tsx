import Head from "next/head";
import { useEffect, useContext, useState } from "react";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { BudgetCategory } from "../components/budget/budget-category";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebaseApp } from "../firebase/clientApp";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { BudgetUrl } from "../firebase/databaseLinks";

export const Budget = () => {
  // Get a reference to the database service
  const database = getDatabase(firebaseApp);
  const date = new Date();

  const [selectedMonth, setSelectedMonth] = useState(date.getMonth());
  const [selectedYear, setSelectedYear] = useState(date.getFullYear());

  const [snapshot, loading, error] = useObjectVal(
    ref(database, BudgetUrl() + "/" + selectedYear + "/" + selectedMonth)
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Head>
        <title>Budget</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          {!loading && snapshot && <BudgetCategory selectdBudget={snapshot} />}
          <Box sx={{ mt: 3 }}>
            {/* {snapshot && <CarloanTransactions loan={snapshot.val()} customers={customers} />} */}
          </Box>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};
Budget.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Budget;
