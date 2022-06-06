import { useState } from "react";
import { Button, Box, Grid, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getTime } from "date-fns";
import { useAppSelector } from "../../app/hooks";
import { selectFamilyBaseUrl } from "../../app/sessionSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useForm } from "react-hook-form";
import { FormInputDate } from "../forms/date-input";
import { FormInputText } from "../forms/text-input";
import { FormInputDropdown } from "../forms/dropdown-input";
import { createReminder } from "../../api/reminders-api";
import { TypeOfOccuranceType } from "../dataDisplay/date-util";

const defaultValues = {
  date: new Date(),
  day: "",
  name: "",
  typeOfOccurance: "",
};

export const ReminderAddDialog = () => {
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);
  const [open, setOpen] = useState(false);

  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, reset, control } = methods;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (data: any) => {
    if (isNaN(data.date)) {
      return;
    }
    let reminder = {
      date: getTime(data.date),
      day: parseInt(data.day) ?? "",
      name: data.name ?? "",
      typeOfOccurance: data.typeOfOccurance,
    };

    createReminder(familyIdBaseUrl, reminder);
    handleClose();
  };

  return (
    <>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab
          color="primary"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormInputText fullWidth name="name" control={control} label="Name" />
            </Grid>
            <Grid item xs={12}>
              <FormInputDate name="date" control={control} label="Last Date" />
            </Grid>
            <Grid item xs={6}>
              <FormInputDropdown
                fullWidth
                rules={{ validate: (value: any) => value != 0 }}
                name="typeOfOccurance"
                control={control}
                label="Type of Occurance"
                options={Object.values(TypeOfOccuranceType)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormInputText fullWidth name="day" control={control} label="Day" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
