import { useEffect, useState, useContext } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { firebase } from "../../firebase/clientApp";
import { ref, getDatabase } from "firebase/database";
import { MoneyFormatter } from "../dataDisplay/numberFormatter";
import { TransactionModal } from "./savings-transactionModel";
import { SavingsTransactions } from "./savings-transactions";
import { updateSavingsBucketTotal } from "../../api/savings-api";
import AppContext from "src/context/AppContext";
import { GetSavingsTotalOfBucket } from "src/hooks/savings";

export const SavingBucket = ({ bucket, bucketId }) => {
  const value = useContext(AppContext);
  const database = getDatabase(firebase);

  const [total, loading, error] = GetSavingsTotalOfBucket(bucketId);

  useEffect(() => {
    if (bucket.amount !== total.amount) {
      bucket.amount = total.amount;
      updateSavingsBucketTotal(value.state.familyIdBaseUrl, bucket, bucketId);
    }
  }, [total]);

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
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography color="textSecondary" variant="caption">
            Goal: {MoneyFormatter(bucket.goal)}
          </Typography>
        </Box>
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
