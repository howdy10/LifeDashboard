import { Box } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { InsuranceClaims } from "../components/insurance/insurance-claims";
import { InsuranceBoard } from "../components/insurance/insurance-board";
import { InsuranceUrl } from "../firebase/databaseConstants";
import { DashboardContainer } from "../components/dashboard-container";
import { insuranceDb } from "../hooks/insurance";
import { GetFromDatabase } from "../hooks/baseHook";

export const Insurance = () => {
  const [snapshot, loading, error] = GetFromDatabase<insuranceDb>(InsuranceUrl);

  return (
    <DashboardContainer title={"Insurance"}>
      {!loading && snapshot && <InsuranceBoard insurance={snapshot} />}
      <Box sx={{ mt: 3 }}>{snapshot && <InsuranceClaims claims={snapshot.claims} />}</Box>
    </DashboardContainer>
  );
};
Insurance.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Insurance;
