import React from "react";
import { Grid } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { DashboardContainer } from "../components/dashboard-container";
import { Typography } from "@mui/material";
import { GetReminders } from "../hooks/reminders";
import { LoadingComponent } from "../components/loading-component";
import { ReminderCard } from "../components/reminders/reminders-card";
import { ReminderAddDialog } from "../components/reminders/reminders-addModal";

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
        <ReminderAddDialog />
      </LoadingComponent>
    </DashboardContainer>
  );
};
Reminders.getLayout = (page: JSX.Element) => <DashboardLayout>{page}</DashboardLayout>;

export default Reminders;
