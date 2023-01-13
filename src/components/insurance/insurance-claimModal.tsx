import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getTime } from "date-fns";
import Grid from "@mui/material/Grid";
import { GetInsuranceMembers, GetInsuranceProviders } from "../../hooks/insurance";
import { createInsuranceClaim } from "../../api/insurance-api";
import { useForm } from "react-hook-form";
import { FormInputDate } from "../forms/date-input";
import { FormInputMoney } from "../forms/money-input";
import { FormInputSwitch } from "../forms/switch-input";
import { FormInputText } from "../forms/text-input";
import { FormInputDropdown } from "../forms/dropdown-input";
import { useAppSelector } from "../../app/hooks";
import { selectFamilyBaseUrl } from "../../app/sessionSlice";

const defaultValues = {
  amount: 0,
  date: new Date(),
  notes: "",
  member: 0,
  provider: 0,
  checkboxValue: [],
};

export function ClaimModal() {
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);

  const [open, setOpen] = useState(false);
  const [members, membersLoading, membersError] = GetInsuranceMembers();
  const [providers, providersLoading, providersError] = GetInsuranceProviders();

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
      cost: parseFloat(data.amount),
      date: getTime(data.date),
      notes: data.notes ?? "",
      person: data.member,
      provider: data.provider,
      paid: data.checkboxValue.includes(3),
      bill: data.checkboxValue.includes(2),
      insurance: data.checkboxValue.includes(1),
    };

    createInsuranceClaim(familyIdBaseUrl, claim);
    handleClose();
  };

  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleClickOpen} sx={{ mr: 1 }}>
        Add Claim
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
              <FormInputDropdown
                fullWidth
                rules={{ validate: (value) => value != 0 }}
                name="member"
                control={control}
                label="Member"
                options={members}
              />
            </Grid>
            <Grid item xs={6}>
              <FormInputDropdown
                fullWidth
                rules={{ validate: (value) => value != 0 }}
                name="provider"
                control={control}
                label="Provider"
                options={providers}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputSwitch
                control={control}
                setValue={setValue}
                name={"checkboxValue"}
                options={[
                  {
                    label: "Insurance",
                    value: 1,
                  },
                  {
                    label: "Bill",
                    value: 2,
                  },
                  {
                    label: "Paid",
                    value: 3,
                  },
                ]}
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
