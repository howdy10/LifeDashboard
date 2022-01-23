import { Avatar, Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import { LinearProgressWithLabel } from "../dataDisplay/linearProgressWithLabel";

export const InsuranceDeductable = ({ paid, deductible, outOfPocket, ...rest }) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textPrimary" gutterBottom variant="h5">
            Insurance values
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Box>
        <Typography sx={{ mb: 1, mt: 1 }}>Deductible</Typography>
        <LinearProgressWithLabel
          current={paid > deductible ? deductible : paid}
          goal={deductible}
          showCurrentLabel={true}
          showGoalLabel={true}
        />
        <Typography sx={{ mb: 1, mt: 1 }}>Out of Pocket Max</Typography>
        <LinearProgressWithLabel
          current={paid > outOfPocket ? outOfPocket : paid}
          goal={outOfPocket}
          showCurrentLabel={true}
          showGoalLabel={true}
        />
      </Box>
    </CardContent>
  </Card>
);
