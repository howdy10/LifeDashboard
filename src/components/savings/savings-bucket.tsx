import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { MoneyFormatter } from "../dataDisplay/numberFormatter";
import { SavingsTransactionModal } from "./savings-transactionModel";
import { SavingsTransactions } from "./savings-transactions";
import { SavingsUrl } from "../../firebase/databaseConstants";
import { GetFromDatabase } from "../../hooks/baseHook";
import { TransactionDB } from "../../hooks/savings";

export interface SavingBucketInput {
  bucket: any;
  bucketId: string;
}

export const SavingBucket = ({ bucket, bucketId }: SavingBucketInput) => {
  const [bucketTransactions, transactionsLoading, transactionsError] =
    GetFromDatabase<TransactionDB>(SavingsUrl + "/bucketTransactions/" + bucketId);

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {bucket.name}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {MoneyFormatter(bucket.amount)}
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
            <SavingsTransactionModal bucketId={bucketId} bucketName={bucket.name} />
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
