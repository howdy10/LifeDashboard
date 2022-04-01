import { Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import { CurrentModal } from "./balance-currentModal";
import { CardInfoRowMoney } from "../dataDisplay/card-infoRow";

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
          <CardInfoRowMoney title={"Spent This Month"} value={spentAmount} />
          <CardInfoRowMoney title={"On Credit Card"} value={creditCardAmount} />
          <CardInfoRowMoney title={"Income Earned"} value={incomeAmount} />
        </Grid>
      </Box>
    </CardContent>
  </Card>
);
