import { useState, useContext } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getTime } from "date-fns";
import Grid from "@mui/material/Grid";
import { createHsaTransaction } from "../../api/hsa-api";
import { useForm } from "react-hook-form";
import { FormInputDate } from "../forms/date-input";
import { FormInputMoney } from "../forms/money-input";
import { FormInputText } from "../forms/text-input";
import { FormInputDropdown } from "../forms/dropdown-input";
import { GetHsaCategories } from "../../hooks/hsa";
import { useAppSelector } from "../../app/hooks";
import { selectFamilyBaseUrl } from "../../app/sessionSlice";

const defaultValues = {
  amount: 0,
  date: new Date(),
  notes: "",
  vendor: "",
  category: 0,
};

export function HsaModal() {
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);

  const [open, setOpen] = useState(false);

  const [categories] = GetHsaCategories();

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
    let claim = {
      amount: parseFloat(data.amount),
      date: getTime(data.date),
      notes: data.notes ?? "",
      vendor: data.vendor ?? "",
      category: data.category,
    };

    createHsaTransaction(familyIdBaseUrl, claim);
    handleClose();
  };

  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleClickOpen} sx={{ mr: 1 }}>
        Add HSA Transaction
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Transaction</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormInputMoney
                rules={{ required: true }}
                fullWidth
                name="amount"
                control={control}
                label="Cost"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDate name="date" control={control} label="Transaction date" />
            </Grid>
            <Grid item xs={6}>
              <FormInputText fullWidth name="vendor" control={control} label="Vendor" />
            </Grid>
            <Grid item xs={6}>
              <FormInputDropdown
                fullWidth
                rules={{ validate: (value) => value != 0 }}
                name="category"
                control={control}
                label="Category"
                options={categories}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                name="notes"
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
    </div>
  );
}
