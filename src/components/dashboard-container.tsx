import Head from "next/head";
import { Container } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export interface DashboardContainerProps {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export const DashboardContainer = ({ title, children }: DashboardContainerProps) => {
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
