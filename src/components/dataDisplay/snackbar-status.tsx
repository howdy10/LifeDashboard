import { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

export interface SnackbarStatusProps {
  isCreatedOpen?: boolean;
  isUpdateOpen?: boolean;
  isErrorOpen?: boolean;
  isDeleteOpen?: boolean;
  closeAll: (event: React.SyntheticEvent | Event, reason?: string) => void;
  type: string;
  timeout?: number;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function SnackbarStatus({
  isCreatedOpen = false,
  isUpdateOpen = false,
  isErrorOpen = false,
  isDeleteOpen = false,
  closeAll,
  type,
  timeout = 3000,
}: SnackbarStatusProps) {
  return (
    <>
      <Snackbar open={isCreatedOpen} autoHideDuration={timeout} onClose={closeAll}>
        <Alert onClose={closeAll} severity="success" sx={{ width: "100%" }}>
          {type} created
        </Alert>
      </Snackbar>
      <Snackbar open={isUpdateOpen} autoHideDuration={timeout} onClose={closeAll}>
        <Alert onClose={closeAll} severity="success" sx={{ width: "100%" }}>
          {type} updated
        </Alert>
      </Snackbar>
      <Snackbar open={isErrorOpen} autoHideDuration={timeout} onClose={closeAll}>
        <Alert onClose={closeAll} severity="error" sx={{ width: "100%" }}>
          {type} not complete
        </Alert>
      </Snackbar>
      <Snackbar open={isDeleteOpen} autoHideDuration={timeout} onClose={closeAll}>
        <Alert onClose={closeAll} severity="error" sx={{ width: "100%" }}>
          {type} deleted
        </Alert>
      </Snackbar>
    </>
  );
}
