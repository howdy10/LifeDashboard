import React, { useState } from "react";
import { Fab } from "@mui/material";
import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";
import { SavingsTransactionForm } from "./savings-transactionForm";

export interface savingsTransactionModalInput {
  bucketId: string;
  bucketName: string;
}

export function SavingsTransactionModal({ bucketId, bucketName }: savingsTransactionModalInput) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Fab color="primary" size="small" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <SavingsTransactionForm
        bucketId={bucketId}
        bucketName={bucketName}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}

SavingsTransactionModal.propTypes = {
  bucketId: PropTypes.string.isRequired,
  bucketName: PropTypes.string.isRequired,
};
