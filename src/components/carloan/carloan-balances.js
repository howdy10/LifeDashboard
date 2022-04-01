import { Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import { CardInfoRowMoney } from "../dataDisplay/card-infoRow";

export const CarloanBalances = ({ remaning, initial }) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textPrimary" gutterBottom variant="h4">
            Balances
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
          <CardInfoRowMoney title={"Initial Balance"} value={initial} />
          <CardInfoRowMoney title={"Remaining Balance"} value={remaning} />
        </Grid>
      </Box>
    </CardContent>
  </Card>
);
