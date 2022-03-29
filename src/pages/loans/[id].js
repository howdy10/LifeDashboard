import { useRouter } from "next/router";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebase } from "../../firebase/clientApp";
import { AllLoansUrl } from "src/firebase/databaseLinks";
import { CarloanBoard } from "src/components/carloan/carloan-board";
import { CarloanTransactions } from "src/components/carloan/carloan-transactions";
import { HomeloanBoard } from "src/components/homeloan/homeloan-board";
import { HomeloanTransactions } from "src/components/homeloan/homeloan-transactions";
import { DashboardContainer } from "src/components/dashboard-container";

const CarLoan = ({ snapshot, loanId }) => {
  return (
    <Container maxWidth={false}>
      {snapshot && <CarloanBoard loan={snapshot} loanId={loanId} />}
      <Box sx={{ mt: 3 }}>
        {snapshot && <CarloanTransactions loan={snapshot} loanId={loanId} />}
      </Box>
    </Container>
  );
};

const HouseLoan = ({ snapshot, loanId }) => {
  return (
    <Container maxWidth={false}>
      {snapshot && <HomeloanBoard loan={snapshot} loanId={loanId} />}
      <Box sx={{ mt: 3 }}>
        {snapshot && <HomeloanTransactions loan={snapshot} loanId={loanId} />}
      </Box>
    </Container>
  );
};

export const Loan = () => {
  const router = useRouter();
  const { id } = router.query;

  const database = getDatabase(firebase);

  const [snapshot, loading, error] = useObjectVal(ref(database, AllLoansUrl() + "/" + id));

  return (
    <DashboardContainer title={snapshot?.name + " Loan"}>
      {!loading && snapshot.type === "mortgage" ? (
        <HouseLoan snapshot={snapshot} loanId={id} />
      ) : (
        <CarLoan snapshot={snapshot} loanId={id} />
      )}
    </DashboardContainer>
  );
};

Loan.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Loan;
