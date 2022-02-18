import { TransactionModal } from "./homeloan-transactionModel";
import { Box, Card, Typography } from "@mui/material";
import { DashboardTable } from "../dashboadTable/dashboardTable";

const columns = [
  { title: "Date", field: "date", type: "date" },
  { title: "Amount", field: "amount", type: "currency" },
  { title: "Interest", field: "interest", type: "currency" },
  { title: "Escrow", field: "escrow", type: "currency" },
];
const order = {
  column: "date",
  direction: "desc",
};
export const HomeloanTransactions = ({ loan, loanId, ...rest }) => (
  <Card>
    {/* <CardHeader title="Payments" /> */}
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: 2,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        Payments
      </Typography>
      <Box sx={{ m: 1 }}>
        <TransactionModal loanId={loanId} />
      </Box>
    </Box>
    <DashboardTable columns={columns} data={loan.transactions} order={order} />
  </Card>
);
