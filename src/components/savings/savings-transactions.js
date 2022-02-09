import { useState } from "react";
import ListIcon from "@mui/icons-material/List";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Fab } from "@mui/material";
import { deleteSavingTransaction } from "../../api/savings-api";
import { getTime } from "date-fns";
import { DashboardTable } from "../dashboadTable/dashboardTable";
import { createSavingTransaction, updateSavingTransaction } from "../../api/savings-api";

const columns = [
  { title: "Date", field: "date", type: "date" },
  { title: "Amount", field: "amount", type: "currency" },
  { title: "Note", field: "note" },
];
const order = {
  column: "date",
  direction: "desc",
};

export const SavingsTransactions = ({ transactions, bucketName, bucketId, ...rest }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateRow = (newData, oldData, index) => {
    if (newData.amount === 0 || newData.date === null) {
      console.log("aleart not full object");
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
      updateSavingTransaction(transaction, index);
    } else {
      createSavingTransaction(transaction);
    }
  };

  const handleDeleteRow = (oldData, index) => {
    deleteSavingTransaction(index, oldData.bucketId);
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
    </>
  );
};
