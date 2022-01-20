import * as React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ClaimModal } from "./insurance-claimModal";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {format(row.date, "MM/dd/yyyy")}
        </TableCell>
        <TableCell align="right">
          {row.cost.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </TableCell>
        <TableCell>{row.provider}</TableCell>
        <TableCell>{row.person}</TableCell>
        <TableCell align="center">
          {row.insurance ? <CheckIcon color="success" /> : <CloseIcon />}
        </TableCell>
        <TableCell align="center">
          {row.bill ? <CheckIcon color="success" /> : <CloseIcon />}
        </TableCell>
        <TableCell align="center">
          {row.paid ? <CheckIcon color="success" /> : <CloseIcon />}
        </TableCell>

        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Notes:
              </Typography>
              <Typography>{row.notes}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    cost: PropTypes.number.isRequired,
    paid: PropTypes.bool.isRequired,
    notes: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    provider: PropTypes.string.isRequired,
    person: PropTypes.string.isRequired,
  }).isRequired,
};

export function InsuranceClaims({ claims, ...rest }) {
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
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Provider</TableCell>
              <TableCell>Person</TableCell>
              <TableCell>Insurance Recieved</TableCell>
              <TableCell>Bill Recieved</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(claims).map((id, index) => (
              <Row key={index} row={claims[id]} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
