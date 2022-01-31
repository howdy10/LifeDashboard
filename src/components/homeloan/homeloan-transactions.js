import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import { TransactionModal } from "./carloan-transactionModel";
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
    <PerfectScrollbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sortDirection="desc">Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Interest</TableCell>
            <TableCell>Escrow</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loan.transactions &&
            Object.keys(loan.transactions).map((id, index) => (
              <TableRow hover key={index}>
                <TableCell>{format(loan.transactions[id].date, "MM/dd/yyyy")}</TableCell>
                <TableCell>
                  {loan.transactions[id].amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </TableCell>
                <TableCell>
                  {loan.transactions[id].interest.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </TableCell>
                <TableCell>
                  {loan.transactions[id].escrow.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </PerfectScrollbar>
  </Card>
);
