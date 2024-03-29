import { useState } from "react";
import { getTime } from "date-fns";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { ClaimModal } from "./insurance-claimModal";
import { DashboardTable } from "../dashboadTable/dashboardTable";
import {
  createListResource,
  deleteListResource,
  updateListResource,
} from "../../api/rest-list-api";
import { InsuranceClaimsUrl } from "../../firebase/databaseLinks";
import { SnackbarStatus } from "../dataDisplay/snackbar-status";
import { claimDB } from "../../hooks/insurance";

const columns = [
  { title: "Date", field: "date", type: "date" },
  { title: "Amount", field: "cost", type: "currency" },
  { title: "Provider", field: "provider", edit: false },
  { title: "Person", field: "person", edit: false },
  { title: "Insurance Recieved", field: "insurance", type: "boolean" },
  { title: "Bill Recieved", field: "bill", type: "boolean" },
  { title: "Paid", field: "paid", type: "boolean" },
];

interface InsuranceClaimsInput {
  claims: claimDB[];
  year: number;
}

export function InsuranceClaims({ claims, year, ...rest }: InsuranceClaimsInput) {
  const [updatedSnackbar, setUpdatedSnackbar] = useState(false);
  const [deletedErrorSnackbar, setDeletedErrorSnackbar] = useState(false);
  const [deletedSnackbar, setDeletedSnackbar] = useState(false);
  const claimUrl = InsuranceClaimsUrl(year);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setUpdatedSnackbar(false);
    setDeletedErrorSnackbar(false);
    setDeletedSnackbar(false);
  };

  const handleUpdateRow = (newData, oldData, index) => {
    if (newData.member === 0 || newData.date === null || newData.provider === 0) {
      setDeletedErrorSnackbar(true);
      return;
    }
    let claim = {
      cost: parseFloat(newData.cost),
      date: getTime(newData.date),
      notes: newData.notes,
      person: newData.person,
      provider: newData.provider,
      paid: newData.paid,
      bill: newData.bill,
      insurance: newData.insurance,
    };
    if (index) {
      updateListResource(claimUrl, claim, index);
    } else {
      createListResource(claimUrl, claim);
    }
    setUpdatedSnackbar(true);
  };

  const handleDeleteRow = (oldData, index) => {
    deleteListResource(claimUrl, index);
    setDeletedSnackbar(true);
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
          Claims
        </Typography>
        <Box sx={{ m: 1 }}>
          <ClaimModal year={year} />
        </Box>
      </Box>
      <DashboardTable
        columns={columns}
        data={claims}
        rowEdits={handleUpdateRow}
        rowDelete={handleDeleteRow}
        order={{ column: "date", direction: "asc" }}
        infoRow={(values) => (
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              Notes:
            </Typography>
            <Typography>{values[0]}</Typography>
          </Box>
        )}
        showPagination={true}
        infoRowVaribles={["notes"]}
        infoRowEditComponent={(values, onChange) => (
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              Notes:
            </Typography>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Notes"
              multiline
              value={values[0]}
              onChange={(newValue) => {
                onChange(newValue.target.value, 0);
              }}
              rows={4}
            />
          </Box>
        )}
      />
      <SnackbarStatus
        isUpdateOpen={updatedSnackbar}
        isDeleteOpen={deletedSnackbar}
        isErrorOpen={deletedErrorSnackbar}
        closeAll={handleSnackbarClose}
        type="Claim"
      />
    </Card>
  );
}
