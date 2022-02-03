import { useState, forwardRef } from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography, Fab } from "@mui/material";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import NumberFormat from "react-number-format";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AddIcon from "@mui/icons-material/Add";
import { getTime } from "date-fns";
import { ref, getDatabase, push, child, update } from "firebase/database";
import { firebase } from "../../firebase/clientApp";
import { CarLoanTransactionUrl } from "../../firebase/databaseLinks";
import { createSavingTransaction } from "../../api/savings-api";

export function TransactionModal({ bucketId, bucketName }) {
  const [open, setOpen] = useState(false);

  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(null);
  const [note, setNote] = useState("");

  const [submittionAttempt, setSubmittionAttempt] = useState(false);

  const handleAmoutChange = (event) => {
    setAmount(event.target.value);
  };
  const handleNoteChange = (event) => {
    setAmount(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
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
    createSavingTransaction(transaction);
    handleClose();
    setOpen(false);
  };

  return (
    <div>
      <Grid item>
        <Fab color="primary" size="small" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Transaction</DialogTitle>
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
    </div>
  );
}
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
