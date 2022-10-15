import { useState, useContext } from "react";
import { getTime } from "date-fns";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { ClaimModal } from "./insurance-claimModal";
import { DashboardTable } from "../dashboadTable/dashboardTable";
import {
  createInsuranceClaim,
  deleteInsuranceClaim,
  updateInsuranceClaim,
} from "../../api/insurance-api";
import { SnackbarStatus } from "../dataDisplay/snackbar-status";
import { useAppSelector } from "../../app/hooks";
import { selectFamilyBaseUrl } from "../../app/sessionSlice";

function Row(props) {
  const { row } = props;

  return (
    <TableRow hover sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell>{row.provider}</TableCell>
    </TableRow>
  );
}

const columns = [
  { title: "Date", field: "date", type: "date" },
  { title: "Amount", field: "cost", type: "currency" },
  { title: "Provider", field: "provider", edit: false },
  { title: "Person", field: "person", edit: false },
  { title: "Insurance Recieved", field: "insurance", type: "boolean" },
  { title: "Bill Recieved", field: "bill", type: "boolean" },
  { title: "Paid", field: "paid", type: "boolean" },
];

export function InsuranceClaims({ claims, ...rest }) {
  const [updatedSnackbar, setUpdatedSnackbar] = useState(false);
  const [deletedErrorSnackbar, setDeletedErrorSnackbar] = useState(false);
  const [deletedSnackbar, setDeletedSnackbar] = useState(false);
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);

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
      updateInsuranceClaim(familyIdBaseUrl, claim, index);
    } else {
      createInsuranceClaim(familyIdBaseUrl, claim);
    }
    setUpdatedSnackbar(true);
  };

  const handleDeleteRow = (oldData, index) => {
    deleteInsuranceClaim(familyIdBaseUrl, index);
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
          <ClaimModal />
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
