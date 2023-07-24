import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { BalanceCreditCardUrl, BalanceSpentUrl } from "../../firebase/databaseLinks";
import { useForm } from "react-hook-form";
import { FormInputMoney } from "../forms/money-input";
import { BaseCreateOrUpdate } from "../../api/rest-api";

const defaultValues = { spent: 0, creditCard: 0 };

interface CurrentModalInput {
  spent: number;
  creditCard: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
}

export function CurrentModal({
  spent,
  creditCard,
  month,
  year,
  isCurrentMonth,
}: CurrentModalInput) {
  const balanceSpentUrl = BalanceSpentUrl(year, month);
  const balanceCreditUrl = BalanceCreditCardUrl();

  const [open, setOpen] = useState(false);

  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue } = methods;

  useEffect(() => {
    reset({ spent: spent, creditCard: creditCard });
  }, [spent, creditCard]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  //TODO: create object for form results
  const onSubmit = (data: any) => {
    if (isCurrentMonth) {
      BaseCreateOrUpdate(parseFloat(data.creditCard), balanceCreditUrl);
    }
    BaseCreateOrUpdate(parseFloat(data.spent), balanceSpentUrl);

    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleClickOpen} sx={{ mr: 1 }}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Balances</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormInputMoney
                rules={{ required: true, validate: (value) => value != 0 }}
                fullWidth
                name="spent"
                control={control}
                label="Spent"
              />
            </Grid>
            {isCurrentMonth && (
              <Grid item xs={12}>
                <FormInputMoney
                  rules={{ required: true, validate: (value) => value != 0 }}
                  fullWidth
                  name="creditCard"
                  control={control}
                  label="Credit Card"
                />
              </Grid>
            )}
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
