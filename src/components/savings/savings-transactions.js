import { useState, forwardRef, useContext } from "react";
import ListIcon from "@mui/icons-material/List";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Fab } from "@mui/material";
import { getTime } from "date-fns";
import { DashboardTable } from "../dashboadTable/dashboardTable";
import {
  createSavingTransaction,
  updateSavingTransaction,
  deleteSavingTransaction,
} from "../../api/savings-api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AppContext from "../../context/AppContext";

const columns = [
  { title: "Date", field: "date", type: "date" },
  { title: "Amount", field: "amount", type: "currency" },
  { title: "Note", field: "note" },
];
const order = {
  column: "date",
  direction: "desc",
};
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SavingsTransactions = ({ transactions, bucketName, bucketId, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [updatedSnackbar, setUpdatedSnackbar] = useState(false);
  const [deletedErrorSnackbar, setDeletedErrorSnackbar] = useState(false);
  const [deletedSnackbar, setDeletedSnackbar] = useState(false);

  const value = useContext(AppContext);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setUpdatedSnackbar(false);
    setDeletedErrorSnackbar(false);
    setDeletedSnackbar(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateRow = (newData, oldData, index) => {
    if (newData.amount === 0 || newData.date === null || isNaN(newData.amount)) {
      setDeletedErrorSnackbar(true);
      return;
    }
    let transaction = {
      amount: parseFloat(newData.amount),
      note: newData.note,
      date: getTime(newData.date),
      bucket: newData.bucket,
      bucketId: newData.bucketId,
    };

    if (index) {
      updateSavingTransaction(value.state.familyIdBaseUrl, transaction, index);
    } else {
      createSavingTransaction(value.state.familyIdBaseUrl, transaction);
    }
    setUpdatedSnackbar(true);
  };

  const handleDeleteRow = (oldData, index) => {
    deleteSavingTransaction(value.state.familyIdBaseUrl, index, oldData.bucketId);
    setDeletedSnackbar(true);
  };
  return (
    <>
      <Fab color="primary" size="small" onClick={handleClickOpen}>
        <ListIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Transaction for {bucketName}</DialogTitle>
        <DialogContent>
          <DashboardTable
            columns={columns}
            data={transactions}
            rowEdits={handleUpdateRow}
            rowDelete={handleDeleteRow}
            order={order}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={updatedSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          Transaction updated
        </Alert>
      </Snackbar>
      <Snackbar open={deletedErrorSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: "100%" }}>
          Transaction not complete
        </Alert>
      </Snackbar>
      <Snackbar open={deletedSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: "100%" }}>
          Transaction deleted
        </Alert>
      </Snackbar>
    </>
  );
};
