import { Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import { MoneyFormatter } from "src/components/dataDisplay/numberFormatter";
import { CurrentModal } from "./balance-currentModal";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const BalanceCurrent = ({ spentAmount, creditCardAmount, incomeAmount, month }) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textPrimary" gutterBottom variant="h4">
            {monthNames[month]}
          </Typography>
        </Grid>
        <Grid item>
          <CurrentModal spent={spentAmount} creditCard={creditCardAmount} />
        </Grid>
      </Grid>
      <Divider />
      <Box
        sx={{
          pt: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid container>
          <Grid item xs={7}>
            <Typography color="textSecondary" variant="subtitle1">
              Spent This Month
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="textSecondary" variant="subtitle1" align="right">
              {MoneyFormatter(spentAmount)}
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography color="textSecondary" variant="subtitle1">
              On Credit Card
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="textSecondary" variant="subtitle1" align="right">
              {MoneyFormatter(creditCardAmount)}
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography color="textSecondary" variant="subtitle1">
              Income Earned
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="textSecondary" variant="subtitle1" align="right">
              {MoneyFormatter(incomeAmount)}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </CardContent>
  </Card>
);
