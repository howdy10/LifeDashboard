import React from "react";
import { Grid, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { MoneyFormatter } from "./numberFormatter";

type LinearProgressWithLabelProps = {
  current: number;
  goal: number;
  showCurrentLabel?: boolean;
  showGoalLabel?: boolean;
};

const defaultProps = {
  showCurrentLabel: false,
  showGoalLabel: false,
};

export const LinearProgressWithLabel = (
  { current, goal, showCurrentLabel, showGoalLabel }: LinearProgressWithLabelProps,
  ...props: any
) => {
  return (
    <Grid container spacing={1} direction="row" justifyContent="space-between">
      <Grid xs={12} sx={{ paddingLeft: 1, paddingTop: 2 }}>
        <LinearProgress variant="determinate" value={(current / goal) * 100} />
      </Grid>
      {showCurrentLabel && (
        <Grid data-testid="current-label" item xs="auto">
          <Typography
            data-testid="current-label-text"
            variant="body2"
            color="text.secondary"
            align="right"
          >
            {MoneyFormatter(current)}
          </Typography>
        </Grid>
      )}
      {showGoalLabel && (
        <Grid item data-testid="goal-label" xs="auto">
          <Typography data-testid="goal-label-text" variant="body2" color="text.secondary">
            {MoneyFormatter(goal)}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

LinearProgressWithLabel.defaultProps = defaultProps;
