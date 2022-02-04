import { useEffect, useState } from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useObjectVal, useObject } from "react-firebase-hooks/database";
import { firebase } from "../../firebase/clientApp";
import { ref, getDatabase } from "firebase/database";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";
import { MoneyFormatter } from "../dataDisplay/numberFormatter";
import { SavingsUrl } from "../../firebase/databaseLinks";
import { TransactionModal } from "./savings-transactionModel";
import { SavingsTransactions } from "./savings-transactions";
import { updateSavingsBucketTotal } from "../../api/savings-api";

export const SavingBucket = ({ bucket, bucketId }) => {
  const [total, setTotal] = useState(0);

  const database = getDatabase(firebase);

  const [bucketTransactions, loading, error] = useObjectVal(
    ref(database, SavingsUrl() + "/" + bucket.bucketTransactions)
  );

  useEffect(() => {
    let current = 0;
    if (bucketTransactions) {
      Object.keys(bucketTransactions).map(
        (key, index) => (current += bucketTransactions[key].amount)
      );
    }
    setTotal(current);
  }, [bucketTransactions]);

  useEffect(() => {
    if (bucket.amount !== total && total !== 0) {
      bucket.amount = total;
      updateSavingsBucketTotal(bucket, bucketId);
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
              {MoneyFormatter(total)}
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
              transactions={bucketTransactions}
              bucketId={bucketId}
              bucketName={bucket.name}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
