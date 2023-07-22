import { Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import { CardInfoRowMoney } from "../dataDisplay/card-infoRow";

interface InsuranceMemberBreakdownInput {
  paid: number;
  deductible: number;
  outOfPocket: number;
  year: number;
  members: Map<string, number>;
}

export const InsuranceMemberBreakdown = ({ members, ...rest }: InsuranceMemberBreakdownInput) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textPrimary" gutterBottom variant="h5">
            Member Breakdown
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container>
        {Array.from(members.entries()).map((key, index) => (
          <CardInfoRowMoney title={key[0]} value={key[1]} key={index} />
        ))}
      </Grid>
    </CardContent>
  </Card>
);
