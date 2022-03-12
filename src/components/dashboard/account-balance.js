import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import { MoneyFormatter } from "../dataDisplay/numberFormatter";
import { GetCurrentBalance } from "src/hooks/balance";

export const AccountBalance = ({ href, type, ...props }) => {
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
        <AttachMoneyIcon />
      </Avatar>
    );

    return <IconButton onClick={() => router.push("/balance")}> {base}</IconButton>;
  };
  return (
    <Card {...props}>
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
