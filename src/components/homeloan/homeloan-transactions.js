import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import { TransactionModal } from "./homeloan-transactionModel";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import { DashboardTable } from "../dashboadTable/dashboardTable";

const columns = [
  { title: "Date", field: "date", type: "date" },
  { title: "Amount", field: "amount", type: "currency" },
  { title: "Interest", field: "interest", type: "currency" },
  { title: "Escrow", field: "escrow", type: "currency" },
];

export const HomeloanTransactions = ({ loan, ...rest }) => (
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
        <TransactionModal />
      </Box>
    </Box>
    <DashboardTable columns={columns} data={loan.transactions} />
  </Card>
);
