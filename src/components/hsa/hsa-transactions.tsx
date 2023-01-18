import { useState, useEffect } from "react";
import { getTime } from "date-fns";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { DashboardTable } from "../dashboadTable/dashboardTable";
import { HsaModal } from "./hsa-transactionModal";
import { Button } from "@mui/material";
import { SnackbarStatus } from "../dataDisplay/snackbar-status";
import {
  createListResource,
  deleteListResource,
  updateListResource,
} from "../../api/rest-list-api";
import { GetHsaCategories } from "../../hooks/hsa";
import { hsaTransactionDb } from "../../hooks/hsa";
import { HsaTransactionsUrl } from "../../firebase/databaseLinks";

const columns = [
  { title: "Date", field: "date", type: "date" },
  { title: "Amount", field: "amount", type: "currency" },
  { title: "Vendor", field: "vendor", edit: false },
  { title: "Category", field: "category", type: "dropdown", dropdownOptions: [] },
  { title: "Notes", field: "notes" },
];

interface HsaTransactionsInput {
  transactions: hsaTransactionDb[];
  year: number;
}

export function HsaTransactions({ transactions, year, ...rest }: HsaTransactionsInput) {
  const [updatedSnackbar, setUpdatedSnackbar] = useState(false);
  const [deletedErrorSnackbar, setDeletedErrorSnackbar] = useState(false);
  const [deletedSnackbar, setDeletedSnackbar] = useState(false);
  const [masterEdit, setMasterEdit] = useState(false);
  const transactionsUrl = HsaTransactionsUrl(year);
  const [categories] = GetHsaCategories();

  useEffect(() => {
    let categoryIndex = columns.findIndex((x) => x.field === "category");
    columns[categoryIndex].dropdownOptions = categories;
  }, [categories]);

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason: string) => {
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
    if (newData.category) {
      transaction["category"] = newData.category;
    }
    if (index) {
      updateListResource(transactionsUrl, transaction, index);
    } else {
      createListResource(transactionsUrl, transaction);
    }
    setUpdatedSnackbar(true);
  };

  const handleDeleteRow = (oldData: any, index: string) => {
    deleteListResource(transactionsUrl, index);
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
          HSA Transactions {year}
        </Typography>
        <Button onClick={handleEditOpen}>{masterEdit ? "Cancle Edit" : "Edit"}</Button>
        <Box sx={{ m: 1 }}>
          <HsaModal year={year} />
        </Box>
      </Box>
      <DashboardTable
        columns={columns}
        data={transactions}
        rowEdits={handleUpdateRow}
        rowDelete={handleDeleteRow}
        showActions={masterEdit}
        order={{ column: "date", direction: "asc" }}
        showPagination={true}
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
