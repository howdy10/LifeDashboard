import { useEffect, useState } from "react";
import { Box, Grid, CardContent } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { DashboardContainer } from "../components/dashboard-container";
import { Typography } from "@mui/material";
import { GetReminders } from "../hooks/reminders";
import { LoadingComponent } from "../components/loading-component";
import { ReminderCard } from "../components/reminders/reminders-card";

export const Reminders = () => {
  const [reminders, loading, error] = GetReminders();

  return (
    <DashboardContainer title={"Reminders"}>
      <LoadingComponent loading={loading} error={error}>
        <Grid container spacing={3}>
          {reminders ? (
            Object.keys(reminders).map((key, index) => (
              <Grid item key={index} xl={3} lg={6} md={6} sm={12} xs={12}>
                <ReminderCard reminderId={key} reminder={reminders[key]} />
              </Grid>
            ))
          ) : (
            <Typography>There is no reminders</Typography>
          )}
        </Grid>
      </LoadingComponent>
    </DashboardContainer>
  );
};
Reminders.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Reminders;
