import { useState } from "react";
import ListIcon from "@mui/icons-material/List";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Fab } from "@mui/material";
import { getTime } from "date-fns";
import {
  DashboardTable,
  DashboardTableColumn,
  DashboardTableColumnOrder,
} from "../dashboadTable/dashboardTable";
import {
  createSavingTransaction,
  updateSavingTransaction,
  deleteSavingTransaction,
} from "../../api/savings-api";
import { useAppSelector } from "../../app/hooks";
import { selectFamilyBaseUrl } from "../../app/sessionSlice";
import { SnackbarStatus } from "../dataDisplay/snackbar-status";

const columns: DashboardTableColumn[] = [
  { title: "Date", field: "date", type: "date" },
  { title: "Amount", field: "amount", type: "currency" },
  { title: "Note", field: "note" },
];
const order: DashboardTableColumnOrder = {
  column: "date",
  direction: "desc",
};

export const SavingsTransactions = ({ transactions, bucketName, bucketId, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [updatedSnackbar, setUpdatedSnackbar] = useState(false);
  const [deletedErrorSnackbar, setDeletedErrorSnackbar] = useState(false);
  const [deletedSnackbar, setDeletedSnackbar] = useState(false);

  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);

  const handleSnackbarClose = (event: React.SyntheticEvent, reason: string) => {
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
      updateSavingTransaction(familyIdBaseUrl, transaction, index);
    } else {
      createSavingTransaction(familyIdBaseUrl, transaction);
    }
    setUpdatedSnackbar(true);
  };

  const handleDeleteRow = (oldData, index) => {
    deleteSavingTransaction(familyIdBaseUrl, index, oldData.bucketId);
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

      <SnackbarStatus
        isUpdateOpen={updatedSnackbar}
        isDeleteOpen={deletedSnackbar}
        isErrorOpen={deletedErrorSnackbar}
        closeAll={handleSnackbarClose}
        type="Transaction"
      />
    </>
  );
};
