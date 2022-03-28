import { Box, Container, Grid } from "@mui/material";
import { GetCurrentBalance, GetCurrentStats, GetPayChecks } from "src/hooks/balance";
import { HsaTransactions } from "src/components/hsa/hsa-transactions";
import { HsaCategoryChart } from "./hsa-categoryChart";
import { HsaSpent } from "./hsa-spent";

export const HsaBoard = ({ hsaInfo }) => {
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
              <HsaCategoryChart categoryMap={hsaInfo.categorySplit} spentAmount={hsaInfo.total} />
            </Grid>
            <Grid item xs={12}>
              <HsaTransactions transactions={hsaInfo.transactions} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};
