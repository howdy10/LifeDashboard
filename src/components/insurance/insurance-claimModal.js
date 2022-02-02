import { useContext, useState, forwardRef, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import NumberFormat from "react-number-format";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { getTime } from "date-fns";
import { ref, getDatabase, push, child, update } from "firebase/database";
import { firebase } from "../../firebase/clientApp";
import { useObject } from "react-firebase-hooks/database";
import { userContext } from "../../context/userContext";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { getAuth } from "firebase/auth";
import {
  InsuranceClaimsUrl,
  InsuranceMembersUrl,
  InsuranceProvidersUrl,
} from "../../firebase/databaseLinks";

export function ClaimModal() {
  const database = getDatabase(firebase);
  const insuranceClaimUrl = InsuranceClaimsUrl();

  const [open, setOpen] = useState(false);

  const [members, membersLoading, membersError] = useObject(ref(database, InsuranceMembersUrl()));
  const [providers, providersLoading, providersError] = useObject(
    ref(database, InsuranceProvidersUrl())
  );

  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(null);
  const [member, setMember] = useState(0);
  const [provider, setProvider] = useState(0);
  const [notes, setNotes] = useState("");
  const [paid, setPaid] = useState(false);
  const [bill, setBill] = useState(false);
  const [insurance, setInsurance] = useState(false);

  const [submittionAttempt, setSubmittionAttempt] = useState(false);

  const handleAmoutChange = (event) => {
    setAmount(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAmount(0);
    setDate(null);
    setMember(0);
    setProvider(0);
    setNotes("");
    setPaid(false);
    setBill(false);
    setInsurance(false);
    setSubmittionAttempt(false);
    setOpen(false);
  };

  const handleSubmit = () => {
    setSubmittionAttempt(true);

    if (member === 0 || date === null || provider === 0) {
      return;
    }
    let claim = {
      cost: parseFloat(amount),
      date: getTime(date),
      notes: notes,
      person: member,
      provider: provider,
      paid: paid,
      bill: bill,
      insurance: insurance,
    };

    const newKey = push(child(ref(database), insuranceClaimUrl)).key;

    const updates = {};
    updates[insuranceClaimUrl + "/" + newKey] = claim;
    update(ref(database), updates);
    handleClose();
  };

  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleClickOpen} sx={{ mr: 1 }}>
        Add Claim
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Transaction</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Cost"
                value={amount}
                onChange={handleAmoutChange}
                name="cost"
                id="cost-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Transaction date"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => {
                    params.error = submittionAttempt && date === null;
                    return <TextField fullWidth error={true} {...params} />;
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={submittionAttempt && member === 0}
                fullWidth
                required
                id="member-select"
                select
                label="Member"
                value={member}
                onChange={(newValue) => {
                  setMember(newValue.target.value);
                }}
                SelectProps={{
                  native: true,
                }}
              >
                <option key={-1} value={0}>
                  Please Select
                </option>
                {!membersLoading &&
                  Object.keys(members.val()).map((id, index) => (
                    <option key={index} value={members.val()[id]}>
                      {members.val()[id]}
                    </option>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                error={submittionAttempt && provider === 0}
                required
                id="provider-select"
                select
                label="Provider"
                value={provider}
                onChange={(newValue) => {
                  setProvider(newValue.target.value);
                }}
                SelectProps={{
                  native: true,
                }}
              >
                <option key={-1} value={0}>
                  Please Select
                </option>
                {!providersLoading &&
                  Object.keys(providers.val()).map((id, index) => (
                    <option key={index} value={providers.val()[id]}>
                      {providers.val()[id]}
                    </option>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={
                    <Switch
                      checked={insurance}
                      onChange={(event) => {
                        setInsurance(event.target.checked);
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Insurance"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={bill}
                      onChange={(event) => {
                        setBill(event.target.checked);
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Bill"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={paid}
                      onChange={(event) => {
                        setPaid(event.target.checked);
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Paid"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Notes"
                multiline
                onChange={(newValue) => {
                  setNotes(newValue.target.value);
                }}
                rows={4}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
