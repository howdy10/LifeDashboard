import { useState, forwardRef, useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function SnackbarStatus({ isUpdateOpen, isErrorOpen, isDeleteOpen, closeAll, type }) {
  return (
    <>
      <Snackbar open={isUpdateOpen} autoHideDuration={3000} onClose={closeAll}>
        <Alert onClose={closeAll} severity="success" sx={{ width: "100%" }}>
          {type} updated
        </Alert>
      </Snackbar>
      <Snackbar open={isErrorOpen} autoHideDuration={3000} onClose={closeAll}>
        <Alert onClose={closeAll} severity="error" sx={{ width: "100%" }}>
          {type} not complete
        </Alert>
      </Snackbar>
      <Snackbar open={isDeleteOpen} autoHideDuration={3000} onClose={closeAll}>
        <Alert onClose={closeAll} severity="error" sx={{ width: "100%" }}>
          {type} deleted
        </Alert>
      </Snackbar>
    </>
  );
}
