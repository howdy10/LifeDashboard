import React, { useState, forwardRef } from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import NumberFormat from "react-number-format";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Snackbar from "@mui/material/Snackbar";
import { getTime } from "date-fns";
import { createSavingTransaction, updateSavingTransaction } from "../../api/savings-api";
import MuiAlert from "@mui/material/Alert";

export function TransactionForm({
  bucketId,
  bucketName,
  preDate,
  preAmount,
  preNote,
  open,
  setOpen,
  preId,
}) {
  const [completedSnackbar, setCompletedSnackbar] = useState(false);
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setCompletedSnackbar(false);
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [amount, setAmount] = useState(preAmount);
  const [date, setDate] = useState(preDate);
  const [note, setNote] = useState(preNote);

  const [submittionAttempt, setSubmittionAttempt] = useState(false);

  const handleAmoutChange = (event) => {
    setAmount(event.target.value);
  };
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleClose = () => {
    setAmount(0);
    setDate(null);
    setOpen(false);
    setSubmittionAttempt(false);
  };

  const handleSubmit = () => {
    setSubmittionAttempt(true);

    if (amount === 0 || date === null) {
      return;
    }
    let transaction = {
      amount: parseFloat(amount),
      note: note,
      date: getTime(date),
      bucket: bucketName,
      bucketId: bucketId,
    };

    if (preId) {
      updateSavingTransaction(transaction, preId);
    } else {
      createSavingTransaction(transaction);
    }
    setCompletedSnackbar(true);
    handleClose();
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Transaction for {bucketName}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                error={submittionAttempt && amount === 0}
                label="Amount"
                value={amount}
                onChange={handleAmoutChange}
                name="amount"
                id="amount-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Transaction date"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => {
                    params.error = submittionAttempt && date === null;
                    return <TextField fullWidth error={true} {...params} />;
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Notes"
                onChange={handleNoteChange}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={completedSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Transaction Saved
        </Alert>
      </Snackbar>
    </div>
  );
}

TransactionForm.defaultProps = {
  preAmount: 0,
  preDate: null,
  preNote: "",
  preId: undefined,
};
TransactionForm.propTypes = {
  bucketId: PropTypes.string.isRequired,
  bucketName: PropTypes.string.isRequired,
  preAmount: PropTypes.number,
  preDate: PropTypes.number,
  preNote: PropTypes.string,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
