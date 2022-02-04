import React, { useState, forwardRef } from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography, Fab } from "@mui/material";
import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";
import { TransactionForm } from "./savings-transactionForm";

export function TransactionModal({ bucketId, bucketName }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Fab color="primary" size="small" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <TransactionForm bucketId={bucketId} bucketName={bucketName} open={open} setOpen={setOpen} />
    </>
  );
}

TransactionModal.propTypes = {
  bucketId: PropTypes.string.isRequired,
  bucketName: PropTypes.string.isRequired,
};
