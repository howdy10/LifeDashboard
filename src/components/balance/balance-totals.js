import { Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import { MoneyFormatter } from "src/components/dataDisplay/numberFormatter";

export const BalanceTotals = ({ bankAmount, afterCreditCard, monthNet }) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textPrimary" gutterBottom variant="h4">
            Balances
          </Typography>
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
              Bank Account
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="textSecondary" variant="subtitle1" align="right">
              {MoneyFormatter(bankAmount)}
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography color="textSecondary" variant="subtitle1">
              After Credit Card
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="textSecondary" variant="subtitle1" align="right">
              {MoneyFormatter(afterCreditCard)}
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography color="textSecondary" variant="subtitle1">
              Net Balance
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="textSecondary" variant="subtitle1" align="right">
              {MoneyFormatter(monthNet)}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </CardContent>
  </Card>
);
