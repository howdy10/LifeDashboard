import React from "react";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import { MoneyFormatter } from "./numberFormatter";

export function LinearProgressWithLabel(props) {
  return (
    <Grid container spacing={1} direction="row" justifyContent="space-between">
      <Grid xs={12} sx={{ paddingLeft: 1, paddingTop: 2 }}>
        <LinearProgress variant="determinate" value={(props.current / props.goal) * 100} />
      </Grid>
      {props.showCurrentLabel && (
        <Grid data-testid="current-label" item xs="auto">
          <Typography
            data-testid="current-label-text"
            variant="body2"
            color="text.secondary"
            align="right"
          >
            {MoneyFormatter(props.current)}
          </Typography>
        </Grid>
      )}
      {props.showGoalLabel && (
        <Grid item data-testid="goal-label" xs="auto">
          <Typography data-testid="goal-label-text" variant="body2" color="text.secondary">
            {MoneyFormatter(props.goal)}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
LinearProgressWithLabel.defaultProps = {
  showCurrentLabel: false,
  showGoalLabel: false,
};
LinearProgressWithLabel.propTypes = {
  current: PropTypes.number.isRequired,
  goal: PropTypes.number.isRequired,
  showCurrentLabel: PropTypes.bool,
  showGoalLabel: PropTypes.bool,
};
