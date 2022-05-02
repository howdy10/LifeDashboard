import { Box, Container, Grid } from "@mui/material";
import { BalanceCurrent } from "./balance-current";
import { GetCurrentBalance } from "src/hooks/balance";
import { BalanceTotals } from "./balance-totals";
import { BalancePaychecks } from "./balance-paychecks";
import { LoadingComponent } from "../loading-component";

export const BalanceBoard = ({ month, year }) => {
  const [balance, loading, error] = GetCurrentBalance(year, month);

  const today = new Date();
  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const isLastMonth = lastMonth.getMonth() === month && lastMonth.getFullYear() === year;
  return (
    <LoadingComponent loading={loading} error={error}>
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
                spentAmount={balance?.spent}
                creditCardAmount={balance?.creditCard}
                incomeAmount={balance.total}
                month={month}
                year={year}
                isCurrentMonth={isCurrentMonth}
                isLastMonth={isLastMonth}
              />
            </Grid>
            <Grid item lg={6} sm={6} xl={6} xs={12}>
              <BalanceTotals
                bankAmount={balance.bankAmount}
                afterCreditCard={balance.afterCreditCard}
                monthNet={balance.total - balance?.spent}
                isCurrentMonth={isCurrentMonth}
              />
            </Grid>

            <Grid item xs={12}>
              <BalancePaychecks income={balance.payChecks} month={month} year={year} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </LoadingComponent>
  );
};
