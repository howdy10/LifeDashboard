import { Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import { calculateTaxBillWithStandardDeduction } from "./taxes-functions";
import { MoneyFormatter, WholeMoneyFormatter } from "../dataDisplay/numberFormatter";

export const TaxResults = ({ income }) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textPrimary" gutterBottom variant="h4">
            Taxes Results
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
          <Grid item xs={7}>
            <Typography color="textSecondary" variant="subtitle1">
              Income
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="textSecondary" variant="subtitle1" align="right">
              {WholeMoneyFormatter(income?.income)}
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography color="textSecondary" variant="subtitle1">
              Taxable Income
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="textSecondary" variant="subtitle1" align="right">
              {WholeMoneyFormatter(income?.income - income?.preTaxDeductions)}
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography color="textSecondary" variant="subtitle1">
              Taxes owed:
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="textSecondary" variant="subtitle1" align="right">
              {WholeMoneyFormatter(
                calculateTaxBillWithStandardDeduction(income?.income - income?.preTaxDeductions)
              )}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </CardContent>
  </Card>
);
