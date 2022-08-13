import { Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import { CardInfoRowMoney } from "../dataDisplay/card-infoRow";

export const CarloanNumbers = ({ totalPaid, principalPaid, interestPaid }) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textPrimary" gutterBottom variant="h4">
            Numbers
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Box
        sx={{
          pt: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid container>
          <CardInfoRowMoney title={"Total Paid"} value={totalPaid} />
          <CardInfoRowMoney title={"Principal Paid"} value={principalPaid} />
          <CardInfoRowMoney title={"Interest Paid"} value={interestPaid} />
        </Grid>
      </Box>
    </CardContent>
  </Card>
);
