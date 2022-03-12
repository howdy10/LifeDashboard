import { Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";

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
        <Typography color="textSecondary" variant="subtitle1">
          Total Paid{": "}
          {totalPaid.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
          <br />
          Principal Paid{": "}
          {principalPaid.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
          <br />
          Interest Paid{": "}
          {interestPaid.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
