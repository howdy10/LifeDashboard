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
import { InsuranceDeductable } from "./insurance-deductable";

export const InsuranceBoard = ({ insurance, ...rest }) => {
  const [claimsAmount, setClaimsAmount] = useState(0);

  const [remaining, setRemaining] = useState(0);
  const [interest, setInterest] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [principalPaid, setPrincipalPaid] = useState(0);

  useEffect(() => {
    let totalPaid = 0;

    if (insurance.claims) {
      Object.keys(insurance.claims).map((key, index) => (totalPaid += insurance.claims[key].cost));
    }

    setClaimsAmount(totalPaid);
  }, [insurance]);
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
            <Grid item xs={12}>
              <InsuranceDeductable
                paid={claimsAmount}
                deductible={insurance.deductible}
                outOfPocket={insurance.outOfPocket}
              />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={12}>
              {/* <CarloanPercent remaning={remaining} initial={loan.loanAmount} /> */}
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={12}>
              {/* <CarloanNumbers
                interestPaid={interest}
                totalPaid={totalPaid}
                principalPaid={principalPaid}
              /> */}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};
