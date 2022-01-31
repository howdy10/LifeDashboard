import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Container,
  Grid,
} from "@mui/material";

import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import { CarloanBalances } from "./carloan-balances";
import { CarloanPercent } from "./carloan-percent";
import { CarloanNumbers } from "./carloan-numbers";

export const CarloanBoard = ({ loan, ...rest }) => {
  const [remaining, setRemaining] = useState(0);
  const [interest, setInterest] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [principalPaid, setPrincipalPaid] = useState(0);

  useEffect(() => {
    let totalPaid = 0;
    let interestPaid = 0;

    if (loan.transactions) {
      Object.keys(loan.transactions).map(
        (key, index) => (totalPaid += loan.transactions[key].amount)
      );
      Object.keys(loan.transactions).map(
        (key, index) => (interestPaid += loan.transactions[key].interest)
      );
    }

    setTotalPaid(totalPaid);
    setInterest(interestPaid);
    setPrincipalPaid(totalPaid - interestPaid);
    setRemaining(loan.loanAmount - totalPaid + interestPaid);
  }, [loan]);
  return (
    <Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={4} sm={4} xl={4} xs={12}>
              <CarloanBalances remaning={remaining} initial={loan.loanAmount} />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={12}>
              <CarloanPercent remaning={remaining} initial={loan.loanAmount} />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={12}>
              <CarloanNumbers
                interestPaid={interest}
                totalPaid={totalPaid}
                principalPaid={principalPaid}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};