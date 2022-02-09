import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import { MoneyFormatter } from "../dataDisplay/numberFormatter";

export const AccountBalance = ({ account, href, props }) => {
  const router = useRouter();

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

    if (href) {
      return <IconButton onClick={() => router.push(href)}> {base}</IconButton>;
    } else {
      return base;
    }
  };
  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {account.title}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {MoneyFormatter(account.amount)}
            </Typography>
          </Grid>
          <Grid item>{Icon()}</Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
