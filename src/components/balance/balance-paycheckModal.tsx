import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getTime } from "date-fns";
import Grid from "@mui/material/Grid";
import { BalancePaycheckUrl } from "../../firebase/databaseLinks";
import { useForm } from "react-hook-form";
import { FormInputDate } from "../forms/date-input";
import { FormInputMoney } from "../forms/money-input";
import { createListResource } from "../../api/rest-list-api";

const defaultValues = {
  amount: 0,
  date: getTime(new Date()),
};

interface PaycheckModalInput {
  year: number;
  month: number;
}

export function PaycheckModal({ year, month }: PaycheckModalInput) {
  const balancePayCheckUrl = BalancePaycheckUrl(year, month);

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

  const onSubmit = (data: any) => {
    let transaction = {
      amount: parseFloat(data.amount),
      date: data.date,
    };

    createListResource(balancePayCheckUrl, transaction);

    handleClose();
  };

  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleClickOpen} sx={{ mr: 1 }}>
        Add Paycheck
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Paycheck</DialogTitle>
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
