import Head from "next/head";
import { Container } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export const DashboardContainer = ({ title, children }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Head>
        <title>{title}</title>
      </Head>

      <Container
        maxWidth={false}
        sx={{
          flexGrow: 1,
          py: 6,
        }}
      >
        {children}
      </Container>
    </LocalizationProvider>
  );
};
export default DashboardContainer;
