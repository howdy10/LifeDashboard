import { useState, useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import { CarloanBalances } from "../carloan/carloan-balances";
import { CarloanPercent } from "../carloan/carloan-percent";
import { HomeloanNumbers } from "../homeloan/homeloan-numbers";

export const HomeloanBoard = ({ loan, ...rest }) => {
  const [remaining, setRemaining] = useState(0);
  const [interest, setInterest] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [principalPaid, setPrincipalPaid] = useState(0);
  const [escrowBalance, setEscrowBalance] = useState(0);

  useEffect(() => {
    let totalPaid = 0;
    let interestPaid = 0;
    let escrowPaid = 0;

    if (loan.transactions) {
      Object.keys(loan.transactions).map((key, index) => {
        totalPaid += loan.transactions[key].amount;
        interestPaid += loan.transactions[key].interest;
        escrowPaid += loan.transactions[key].escrow;
      });
    }

    setTotalPaid(totalPaid);
    setInterest(interestPaid);
    setEscrowBalance(escrowPaid);
    setPrincipalPaid(totalPaid - interestPaid - escrowPaid);
    setRemaining(loan.loanAmount - totalPaid + interestPaid + escrowPaid);
  }, [loan]);
  return (
    <Grid container spacing={3}>
      <Grid item lg={4} sm={4} xl={4} xs={12}>
        <CarloanBalances remaning={remaining} initial={loan.loanAmount} />
      </Grid>
      <Grid item lg={4} sm={4} xl={4} xs={12}>
        <CarloanPercent remaning={remaining} initial={loan.loanAmount} />
      </Grid>
      <Grid item lg={4} sm={4} xl={4} xs={12}>
        <HomeloanNumbers
          interestPaid={interest}
          totalPaid={totalPaid}
          principalPaid={principalPaid}
          escrowBalance={escrowBalance}
        />
      </Grid>
    </Grid>
  );
};
