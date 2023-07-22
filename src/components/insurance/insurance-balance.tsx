import { Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import { CardInfoRowMoney } from "../dataDisplay/card-infoRow";

interface InsuranceBalanceInput {
  paid: number;
  deductible: number;
  outOfPocket: number;
  remaining: number;
}

export const InsuranceBalance = ({ paid, remaining, ...rest }: InsuranceBalanceInput) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textPrimary" gutterBottom variant="h5">
            Balances
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container>
        <CardInfoRowMoney title={"Bills Paid"} value={paid - remaining} />
        <CardInfoRowMoney title={"Bills to Pay"} value={remaining} />
      </Grid>
    </CardContent>
  </Card>
);
