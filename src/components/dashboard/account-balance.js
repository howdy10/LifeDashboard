import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { MoneyFormatter } from "../dataDisplay/numberFormatter";

export const AccountBalance = ({ account, props }) => (
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
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "success.main",
              height: 56,
              width: 56,
            }}
          >
            <AttachMoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
