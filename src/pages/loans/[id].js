import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Container } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DashboardLayout } from "src/components/dashboard-layout";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebase } from "../../firebase/clientApp";
import { AllLoansUrl } from "src/firebase/databaseLinks";
import { CarloanBoard } from "src/components/carloan/carloan-board";
import { CarloanTransactions } from "src/components/carloan/carloan-transactions";
import { HomeloanBoard } from "src/components/homeloan/homeloan-board";
import { HomeloanTransactions } from "src/components/homeloan/homeloan-transactions";

const CarLoan = ({ snapshot }) => {
  return (
    <Container maxWidth={false}>
      {snapshot && <CarloanBoard loan={snapshot} />}
      <Box sx={{ mt: 3 }}>{snapshot && <CarloanTransactions loan={snapshot} />}</Box>
    </Container>
  );
};

const HouseLoan = ({ snapshot }) => {
  return (
    <Container maxWidth={false}>
      {snapshot && <HomeloanBoard loan={snapshot} />}
      <Box sx={{ mt: 3 }}>{snapshot && <HomeloanTransactions loan={snapshot} />}</Box>
    </Container>
  );
};

export const Loan = () => {
  const router = useRouter();
  const { id } = router.query;

  const database = getDatabase(firebase);

  const [snapshot, loading, error] = useObjectVal(ref(database, AllLoansUrl() + "/" + id));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Head>
        <title>{snapshot?.name} Loan</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        {!loading && snapshot.type === "mortgage" ? (
          <HouseLoan snapshot={snapshot} />
        ) : (
          <CarLoan snapshot={snapshot} />
        )}
      </Box>
    </LocalizationProvider>
  );
};

Loan.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Loan;
