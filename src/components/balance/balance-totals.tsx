import { Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import { CardInfoRowMoney } from "../dataDisplay/card-infoRow";

interface BalanceTotalsInput {
  bankAmount: number | undefined;
  afterCreditCard: number | undefined;
  monthNet: number;
  isCurrentMonth: boolean;
}

export const BalanceTotals = ({
  bankAmount,
  afterCreditCard,
  monthNet,
  isCurrentMonth,
}: BalanceTotalsInput) => (
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
          <CardInfoRowMoney
            title={"Bank Account"}
            value={isCurrentMonth ? bankAmount || 0 : afterCreditCard || 0}
          />
          {isCurrentMonth && (
            <CardInfoRowMoney title={"After Credit Card"} value={afterCreditCard || 0} />
          )}
          <CardInfoRowMoney title={"Net Balance"} value={monthNet} />
        </Grid>
      </Box>
    </CardContent>
  </Card>
);
