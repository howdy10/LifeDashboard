import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { getDatabase } from "firebase/database";
import { firebase } from "../firebase/clientApp";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { LoadingComponent } from "src/components/loading-component";
import { GetHsaInfo } from "../hooks/hsa";
import { HsaBoard } from "src/components/hsa/hsa-board";

export const Hsa = () => {
  const database = getDatabase(firebase);

  const [snapshot, loading, error] = GetHsaInfo();

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
            <HsaBoard hsaInfo={snapshot} />
          </LoadingComponent>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};
Hsa.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Hsa;
