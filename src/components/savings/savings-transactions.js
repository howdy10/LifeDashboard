import { format } from "date-fns";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import ListIcon from "@mui/icons-material/List";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const SavingsTransactions = ({ transactions, bucketName, ...rest }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid item>
        <Fab color="primary" size="small" onClick={handleClickOpen}>
          <ListIcon />
        </Fab>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Transaction for {bucketName}</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sortDirection="desc">Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Note</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions &&
                Object.keys(transactions).map((id, index) => (
                  <TableRow hover key={index}>
                    <TableCell>
                      {transactions[id].date && format(transactions[id].date, "MM/dd/yyyy")}
                    </TableCell>
                    <TableCell>
                      {transactions[id].amount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                    <TableCell>{transactions[id].note}</TableCell>

                    <TableCell>
                      <Fab color="primary" size="small">
                        <EditIcon />
                      </Fab>
                    </TableCell>
                    <TableCell>
                      <Fab color="primary" size="small">
                        <DeleteForeverIcon />
                      </Fab>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
