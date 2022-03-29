import { Box } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { InsuranceClaims } from "src/components/insurance/insurance-claims";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebase } from "../firebase/clientApp";
import { InsuranceBoard } from "../components/insurance/insurance-board";
import { InsuranceUrl } from "../firebase/databaseLinks";
import { DashboardContainer } from "src/components/dashboard-container";

export const Insurance = () => {
  const database = getDatabase(firebase);

  const [snapshot, loading, error] = useObjectVal(ref(database, InsuranceUrl()));

  return (
    <DashboardContainer title={Insurance}>
      {!loading && snapshot && <InsuranceBoard insurance={snapshot} />}
      <Box sx={{ mt: 3 }}>{snapshot && <InsuranceClaims claims={snapshot.claims} />}</Box>
    </DashboardContainer>
  );
};
Insurance.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Insurance;
