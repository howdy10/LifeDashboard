import { Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import { CardInfoRowMoney } from "../dataDisplay/card-infoRow";

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
          <CardInfoRowMoney title={"Bank Account"} value={bankAmount} />
          <CardInfoRowMoney title={"After Credit Card"} value={afterCreditCard} />
          <CardInfoRowMoney title={"Net Balance"} value={monthNet} />
        </Grid>
      </Box>
    </CardContent>
  </Card>
);
