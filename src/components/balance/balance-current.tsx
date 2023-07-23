import { Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import { CurrentModal } from "./balance-currentModal";
import { CardInfoRowMoney } from "../dataDisplay/card-infoRow";
import { MonthName } from "../dataDisplay/date-util";

interface BalanceCurrentInput {
  spentAmount: number;
  creditCardAmount: number;
  incomeAmount: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isLastMonth: boolean;
}

export const BalanceCurrent = ({
  spentAmount,
  creditCardAmount,
  incomeAmount,
  month,
  year,
  isCurrentMonth,
  isLastMonth,
}: BalanceCurrentInput) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textPrimary" gutterBottom variant="h4">
            {MonthName(month) + " " + year}
          </Typography>
        </Grid>
        {(isLastMonth || isCurrentMonth) && (
          <Grid item>
            <CurrentModal
              spent={spentAmount}
              creditCard={creditCardAmount}
              month={month}
              year={year}
              isCurrentMonth={isCurrentMonth}
            />
          </Grid>
        )}
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
          {isCurrentMonth && <CardInfoRowMoney title={"On Credit Card"} value={creditCardAmount} />}
          <CardInfoRowMoney title={"Income Earned"} value={incomeAmount} />
        </Grid>
      </Box>
    </CardContent>
  </Card>
);
