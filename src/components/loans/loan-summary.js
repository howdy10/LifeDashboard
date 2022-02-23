import { useEffect, useState } from "react";
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import { MoneyFormatter } from "../dataDisplay/numberFormatter";

export const LoanSummary = ({ loan, loanId }) => {
  const [remaining, setRemaining] = useState(0);
  const router = useRouter();

  const Icon = ({ href }) => {
    let base = (
      <Avatar
        sx={{
          backgroundColor: "info.main",
          height: 56,
          width: 56,
        }}
      >
        <ArrowForwardIosIcon />
      </Avatar>
    );

    if (href) {
      return <IconButton onClick={() => router.push("loans/" + href)}> {base}</IconButton>;
    } else {
      return base;
    }
  };

  useEffect(() => {
    let totalPaid = 0;

    if (loan.transactions) {
      Object.keys(loan.transactions).map(
        (key, index) =>
          (totalPaid +=
            loan.transactions[key].amount -
            loan.transactions[key].interest -
            (loan.transactions[key].escrow ?? 0))
      );
    }

    setRemaining(loan.loanAmount - totalPaid);
  }, [loan]);

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {loan.name}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {MoneyFormatter(remaining)}
            </Typography>
          </Grid>
          <Grid item>
            <Icon href={loanId} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
