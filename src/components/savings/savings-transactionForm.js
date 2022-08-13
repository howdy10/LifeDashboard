import React, { useState, useContext } from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import { getTime } from "date-fns";
import { createSavingTransaction, updateSavingTransaction } from "../../api/savings-api";
import MuiAlert from "@mui/material/Alert";
import { useAppSelector } from "../../app/hooks";
import { selectFamilyBaseUrl } from "../../app/sessionSlice";
import { useForm } from "react-hook-form";
import { FormInputText } from "../forms/text-input";
import { FormInputDate } from "../forms/date-input";
import { FormInputMoney } from "../forms/money-input";

const defaultValues = {
  amount: 0,
  date: new Date(),
  notes: "",
};
export function TransactionForm({ bucketId, bucketName, open, setOpen, preId }) {
  const [completedSnackbar, setCompletedSnackbar] = useState(false);
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setCompletedSnackbar(false);
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

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
      note: data.note ?? "",
      date: getTime(data.date),
      bucket: bucketName,
      bucketId: bucketId,
    };

    if (preId) {
      updateSavingTransaction(familyIdBaseUrl, transaction, preId);
    } else {
      createSavingTransaction(familyIdBaseUrl, transaction);
    }
    setCompletedSnackbar(true);
    handleClose();
  };

  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue } = methods;

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Transaction for {bucketName}</DialogTitle>
        <DialogContent>
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
            <Grid item xs={12}>
              <FormInputDate name="date" control={control} label="Transaction date" />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                name="note"
                control={control}
                label="Notes"
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
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
