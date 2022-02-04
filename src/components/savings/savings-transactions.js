import { format } from "date-fns";
import { useState } from "react";
import ListIcon from "@mui/icons-material/List";
import {
  Button,
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteSavingTransaction } from "../../api/savings-api";
import { TransactionForm } from "./savings-transactionForm";

export const SavingsTransactions = ({ transactions, bucketName, bucketId, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [tryingToDelete, setTryingToDelete] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [editAmount, setEditAmount] = useState(0);
  const [editDate, setEditDate] = useState(null);
  const [editNote, setEditNote] = useState("");
  const [editId, setEditId] = useState(undefined);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTryingToDeleteClose = () => {
    setTryingToDelete(false);
  };

  function descendingComparator(a, b, orderBy) {
    if (transactions[b][orderBy] < transactions[a][orderBy]) {
      return -1;
    }
    if (transactions[b][orderBy] > transactions[a][orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  return (
    <>
      <Fab color="primary" size="small" onClick={handleClickOpen}>
        <ListIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Transaction for {bucketName}</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Note</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions &&
                Object.keys(transactions)
                  .slice()
                  .sort(getComparator("desc", "date"))
                  .map((id, index) => (
                    <>
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
                          <Fab
                            color="primary"
                            size="small"
                            onClick={() => {
                              setEditAmount(transactions[id].amount);
                              setEditDate(transactions[id].date);
                              setEditNote(transactions[id].note);
                              setEditId(id);
                              setEditModal(true);
                            }}
                          >
                            <EditIcon />
                          </Fab>
                        </TableCell>
                        <TableCell>
                          <Fab
                            color="primary"
                            size="small"
                            onClick={() => {
                              setTryingToDelete(true);
                            }}
                          >
                            <DeleteForeverIcon />
                          </Fab>
                        </TableCell>
                      </TableRow>
                      {editModal && (
                        <TransactionForm
                          bucketId={bucketId}
                          bucketName={bucketName}
                          open={editModal}
                          setOpen={setEditModal}
                          preDate={editDate}
                          preAmount={editAmount}
                          preNote={editNote}
                          preId={editId}
                        />
                      )}
                      <Dialog
                        open={tryingToDelete}
                        onClose={handleTryingToDeleteClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Are you sure you want to Delete this transaction?"}
                        </DialogTitle>
                        <DialogActions>
                          <Button onClick={handleTryingToDeleteClose}>Disagree</Button>
                          <Button
                            onClick={() => {
                              deleteSavingTransaction(id, bucketId);
                              handleTryingToDeleteClose();
                            }}
                            autoFocus
                          >
                            Agree
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </>
                  ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
