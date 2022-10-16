import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ref, getDatabase, update } from "firebase/database";
import { firebase } from "../../firebase/clientApp";
import Grid from "@mui/material/Grid";
import { BudgetUrl } from "../../firebase/databaseLinks";
import { useForm } from "react-hook-form";
import { FormInputMoney } from "../forms/money-input";

const defaultValues = { spent: 0, creditCard: 0 };

export function CurrentModal({ spent, creditCard, month, year, isCurrentMonth }) {
  const database = getDatabase(firebase);
  const budgetUrl = BudgetUrl();

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

  const onSubmit = (data) => {
    const updates = {};
    if (isCurrentMonth) {
      updates[budgetUrl + "/creditCard"] = parseFloat(data.creditCard);
    }
    updates[budgetUrl + "/" + year + "/" + month + "/spent"] = parseFloat(data.spent);
    update(ref(database), updates);

    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleClickOpen} sx={{ mr: 1 }}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Paycheck</DialogTitle>
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
