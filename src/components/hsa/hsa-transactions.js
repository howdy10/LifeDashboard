import { useState, useContext } from "react";
import { getTime } from "date-fns";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { DashboardTable } from "../dashboadTable/dashboardTable";
import { HsaModal } from "./hsa-transactionModal";
import { Button } from "@mui/material";
import AppContext from "src/context/AppContext";
import { SnackbarStatus } from "../dataDisplay/Snackbar-status";
import { updateHsaTransaction, createHsaTransaction, deleteHsaTransaction } from "src/api/hsa-api";

const columns = [
  { title: "Date", field: "date", type: "date" },
  { title: "Amount", field: "amount", type: "currency" },
  { title: "Vendor", field: "vendor", edit: false },
  { title: "Notes", field: "notes" },
];

export function HsaTransactions({ transactions, ...rest }) {
  const [updatedSnackbar, setUpdatedSnackbar] = useState(false);
  const [deletedErrorSnackbar, setDeletedErrorSnackbar] = useState(false);
  const [deletedSnackbar, setDeletedSnackbar] = useState(false);
  const [masterEdit, setMasterEdit] = useState(false);
  const value = useContext(AppContext);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setUpdatedSnackbar(false);
    setDeletedErrorSnackbar(false);
    setDeletedSnackbar(false);
  };

  const handleUpdateRow = (newData, oldData, index) => {
    if (newData.date === null) {
      setDeletedErrorSnackbar(true);
      return;
    }
    let transaction = {
      amount: parseFloat(newData.amount),
      date: getTime(newData.date),
      notes: newData.notes,
      vendor: newData.vendor,
    };
    if (index) {
      updateHsaTransaction(value.state.familyIdBaseUrl, transaction, index);
    } else {
      createHsaTransaction(value.state.familyIdBaseUrl, transaction);
    }
    setUpdatedSnackbar(true);
  };

  const handleDeleteRow = (oldData, index) => {
    deleteHsaTransaction(value.state.familyIdBaseUrl, index);
    setDeletedSnackbar(true);
  };

  const handleEditOpen = () => {
    setMasterEdit(!masterEdit);
  };

  return (
    <Card>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: 2,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          HSA Transactions
        </Typography>
        <Button onClick={handleEditOpen}>{masterEdit ? "Cancle Edit" : "Edit"}</Button>
        <Box sx={{ m: 1 }}>
          <HsaModal />
        </Box>
      </Box>
      <DashboardTable
        columns={columns}
        data={transactions}
        rowEdits={handleUpdateRow}
        rowDelete={handleDeleteRow}
        showActions={masterEdit}
      />
      <SnackbarStatus
        isUpdateOpen={updatedSnackbar}
        isDeleteOpen={deletedSnackbar}
        isErrorOpen={deletedErrorSnackbar}
        closeAll={handleSnackbarClose}
        type="Transaction"
      />
    </Card>
  );
}
