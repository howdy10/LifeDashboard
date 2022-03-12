import { Box, Container, Grid } from "@mui/material";
import { BalanceCurrent } from "./balance-current";
import { GetCurrentBalance, GetCurrentStats, GetPayChecks } from "src/hooks/balance";
import { BalanceTotals } from "./balance-totals";
import { BalancePaychecks } from "./balance-paychecks";

export const BalanceBoard = ({ month, year }) => {
  const [balance, loading, error] = GetCurrentBalance(year, month);
  const [currentSpending, spendingLoading, spendingError] = GetCurrentStats();
  const [income, incomeLoading, incomeError] = GetPayChecks(year, month);
  return (
    <Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={6} sm={6} xl={6} xs={12}>
              <BalanceCurrent
                spentAmount={currentSpending?.spent}
                creditCardAmount={currentSpending?.creditCard}
                incomeAmount={income.total}
                month={month}
              />
            </Grid>
            <Grid item lg={6} sm={6} xl={6} xs={12}>
              <BalanceTotals
                bankAmount={balance.bankAmount}
                afterCreditCard={balance.afterCreditCard}
              />
            </Grid>

            <Grid item xs={12}>
              <BalancePaychecks income={income.payChecks} month={month} year={year} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};