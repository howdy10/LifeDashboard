import { Grid, Typography } from "@mui/material";
import { MoneyFormatter } from "./numberFormatter";
export function CardInfoRowMoney({ title, value }) {
  return (
    <>
      <Grid item xs={7}>
        <Typography color="textSecondary" variant="subtitle1">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography color="textSecondary" variant="subtitle1" align="right">
          {MoneyFormatter(value)}
        </Typography>
      </Grid>
    </>
  );
}
export function CardInfoRow({ title, value }) {
  return (
    <>
      <Grid item xs={7}>
        <Typography color="textSecondary" variant="subtitle1">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography color="textSecondary" variant="subtitle1" align="right">
          {value}
        </Typography>
      </Grid>
    </>
  );
}
