import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { HsaTransactions } from "src/components/hsa/hsa-transactions";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebase } from "../firebase/clientApp";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { HsaTransactionsUrl } from "../firebase/databaseLinks";
import { LoadingComponent } from "src/components/loading-component";

export const Hsa = () => {
  const database = getDatabase(firebase);

  const [snapshot, loading, error] = useObjectVal(ref(database, HsaTransactionsUrl()));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Head>
        <title>HSA</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <LoadingComponent loading={loading} error={error}>
            <HsaTransactions transactions={snapshot} />
          </LoadingComponent>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};
Hsa.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Hsa;
