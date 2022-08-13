import { useContext } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { MoneyFormatter } from "../dataDisplay/numberFormatter";
import { TransactionModal } from "./savings-transactionModel";
import { SavingsTransactions } from "./savings-transactions";
import { GetSavingsTotalOfBucket } from "../../hooks/savings";

export const SavingBucket = ({ bucket, bucketId }) => {
  const [total, loading, error] = GetSavingsTotalOfBucket(bucketId);

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {bucket.name}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {MoneyFormatter(total.amount)}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography color="textSecondary" variant="caption">
                Goal: {MoneyFormatter(bucket.goal)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <TransactionModal bucketId={bucketId} bucketName={bucket.name} />
          </Grid>
          <Grid item>
            <SavingsTransactions
              transactions={total.transactions}
              bucketId={bucketId}
              bucketName={bucket.name}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
