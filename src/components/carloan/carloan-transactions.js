import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import { TransactionModal } from "./carloan-transactionModal";
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
} from "@mui/material";

export const CarloanTransactions = ({ loan, ...rest }) => (
  <Card>
    <CardHeader title="Payments" />
    <TransactionModal />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Interest</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loan.transactions &&
              Object.keys(loan.transactions).map((id, index) => (
                <TableRow hover key={loan.transactions[id].id}>
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
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
  </Card>
);
