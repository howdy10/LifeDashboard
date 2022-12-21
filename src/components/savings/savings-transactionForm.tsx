import React, { useState } from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getTime } from "date-fns";
import { createSavingTransaction, updateSavingTransaction } from "../../api/savings-api";
import { useAppSelector } from "../../app/hooks";
import { selectFamilyBaseUrl } from "../../app/sessionSlice";
import { useForm } from "react-hook-form";
import { FormInputText } from "../forms/text-input";
import { FormInputDate } from "../forms/date-input";
import { FormInputMoney } from "../forms/money-input";
import { TransactionDB } from "../../hooks/savings";
import { SnackbarStatus } from "../dataDisplay/snackbar-status";

const defaultValues = {
  amount: 0,
  date: new Date(),
  notes: "",
};

export interface SavingsTransactionFormInput {
  bucketId: string;
  bucketName: string;
  open: boolean;
  setOepn: any;
  preId: any;
}

export function SavingsTransactionForm({ bucketId, bucketName, open, setOpen, preId }) {
  const [completedSnackbar, setCompletedSnackbar] = useState(false);
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);

  const handleSnackbarClose = (event: React.SyntheticEvent, reason: string) => {
    if (reason === "clickaway") {
      return;
    }

    setCompletedSnackbar(false);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (data) => {
    if (isNaN(data.date)) {
      return;
    }
    let transaction: TransactionDB = {
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

      <SnackbarStatus
        isCreatedOpen={completedSnackbar}
        closeAll={handleSnackbarClose}
        type="Transaction"
      />
    </div>
  );
}

SavingsTransactionForm.defaultProps = {
  preAmount: 0,
  preDate: null,
  preNote: "",
  preId: undefined,
};
SavingsTransactionForm.propTypes = {
  bucketId: PropTypes.string.isRequired,
  bucketName: PropTypes.string.isRequired,
  preAmount: PropTypes.number,
  preDate: PropTypes.number,
  preNote: PropTypes.string,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
