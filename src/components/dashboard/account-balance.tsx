import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import { MoneyFormatter } from "../dataDisplay/numberFormatter";
import { GetCurrentBalance } from "../../hooks/balance";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export const AccountBalance = ({ href, type = "full", ...rest }) => {
  const router = useRouter();
  const today = new Date();
  const [balance, loading, error] = GetCurrentBalance(today.getFullYear(), today.getMonth());

  const Icon = () => {
    let base = (
      <Avatar
        sx={{
          backgroundColor: "success.main",
          height: 56,
          width: 56,
        }}
      >
        <AccountBalanceIcon />
      </Avatar>
    );

    return <IconButton onClick={() => router.push(href)}> {base}</IconButton>;
  };
  return (
    <Card {...rest}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {type == "cc" ? "After Credit Card" : "Bank Account"}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {MoneyFormatter(type == "cc" ? balance.afterCreditCard : balance.bankAmount)}
            </Typography>
          </Grid>
          <Grid item>{Icon()}</Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
