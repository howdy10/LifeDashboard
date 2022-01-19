import * as React from "react";
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
import { getTime } from "date-fns";
import { ref, getDatabase, push, child, update } from "firebase/database";
import { firebase } from "../../components/clientApp";

export function TransactionModal() {
  const database = getDatabase(firebase);

  const [open, setOpen] = React.useState(false);

  const [amount, setAmount] = React.useState(0);
  const [interest, setInterest] = React.useState(0);
  const [date, setDate] = React.useState(null);

  const handleAmoutChange = (event) => {
    setAmount(event.target.value);
  };

  const handleInterestChange = (event) => {
    setInterest(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAmount(0);
    setInterest(0);
    setDate(null);
    setOpen(false);
  };

  const handleSubmit = () => {
    let transaction = {
      amount: parseFloat(amount),
      interest: parseFloat(interest),
      date: getTime(date),
    };

    const newTransactionsKey = push(child(ref(database), "Loans/0/transactions")).key;

    const updates = {};
    updates["Loans/0/transactions/" + newTransactionsKey] = transaction;
    update(ref(database), updates);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Transaction
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Transaction</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <TextField
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
            variant="standard"
          />
          <br />
          <TextField
            label="Interest"
            value={interest}
            onChange={handleInterestChange}
            name="interest"
            id="interest-input"
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
            variant="standard"
          />
          <br />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Basic example"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <br />

            <TextField id="outlined-multiline-static" label="Notes" multiline rows={4} />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
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
