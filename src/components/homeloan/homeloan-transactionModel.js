import { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getTime } from "date-fns";
import { ref, getDatabase, push, child, update } from "firebase/database";
import { firebase } from "../../firebase/clientApp";
import Grid from "@mui/material/Grid";
import { AllLoansUrl } from "../../firebase/databaseLinks";
import { useForm } from "react-hook-form";
import { FormInputDate } from "../forms/date-input";
import { FormInputMoney } from "../forms/money-input";

const defaultValues = {
  amount: 0,
  date: new Date(),
  interest: 0,
  escrow: 0,
};
export function TransactionModal({ loanId }) {
  const database = getDatabase(firebase);
  const transactionUrl = AllLoansUrl() + "/" + loanId + "/transactions";

  const [open, setOpen] = useState(false);

  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue } = methods;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (data) => {
    if (isNaN(data.date)) {
      return;
    }
    let transaction = {
      amount: parseFloat(data.amount),
      interest: parseFloat(data.interest),
      date: getTime(data.date),
      escrow: parseFloat(data.escrow),
    };

    const newTransactionsKey = push(child(ref(database), transactionUrl)).key;

    const updates = {};
    updates[transactionUrl + "/" + newTransactionsKey] = transaction;
    update(ref(database), updates);
    handleClose();
  };

  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleClickOpen} sx={{ mr: 1 }}>
        Add Transaction
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Home Transaction</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormInputMoney
                rules={{ required: true, validate: (value) => value != 0 }}
                fullWidth
                name="amount"
                control={control}
                label="Amount"
              />
            </Grid>
            <Grid item xs={6}>
              <FormInputMoney
                rules={{ required: true }}
                fullWidth
                name="escrow"
                control={control}
                label="Escrow"
              />
            </Grid>
            <Grid item xs={6}>
              <FormInputMoney
                rules={{ required: true }}
                fullWidth
                name="interest"
                control={control}
                label="Interest"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDate name="date" control={control} label="Transaction date" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
