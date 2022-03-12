import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import { MoneyFormatter } from "../dataDisplay/numberFormatter";
import { GetSavingsTotalOfBucket } from "src/hooks/savings";

export const SavingsBucketBalance = ({ href, bucketId, ...props }) => {
  const router = useRouter();
  const [savings, savingsLoading, savingsError] = GetSavingsTotalOfBucket(bucketId);

  const Icon = () => {
    let base = (
      <Avatar
        sx={{
          backgroundColor: "success.main",
          height: 56,
          width: 56,
        }}
      >
        <AttachMoneyIcon />
      </Avatar>
    );

    return <IconButton onClick={() => router.push("/savings")}> {base}</IconButton>;
  };
  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {savings.name}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {MoneyFormatter(savings?.amount)}
            </Typography>
          </Grid>
          <Grid item>{Icon()}</Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
