import { Button } from "@mui/material";
import { getTime } from "date-fns";
import { useAppSelector } from "../../app/hooks";
import { selectFamilyBaseUrl } from "../../app/sessionSlice";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { updateReminder } from "../../api/reminders-api";

interface ResetDialogProps {
  open: boolean;
  setOpen: any;
  reminder: any;
  reminderId: any;
}

export const ResetDialog = ({ open, setOpen, reminder, reminderId }: ResetDialogProps) => {
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);

  const resetReminder = () => {
    reminder.date = getTime(new Date());
    updateReminder(familyIdBaseUrl, reminder, reminderId);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Reset</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to reset this reminder?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              resetReminder();
              handleClose();
            }}
          >
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
