import { Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";

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
        <Typography color="textSecondary" variant="subtitle1">
          Initial Balance{": "}
          {initial.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
          <br />
          Remaining Balance{": "}
          {remaning.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
