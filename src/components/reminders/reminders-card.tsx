import { useState, useEffect } from "react";
import { Avatar, Grid, Card, CardContent, Typography } from "@mui/material";
import { DaysBetweenDate, getNextOccurance } from "../dataDisplay/date-util";
import { format, formatDistanceToNow, isToday } from "date-fns";
import DoneIcon from "@mui/icons-material/Done";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DangerousIcon from "@mui/icons-material/Dangerous";
import { ResetDialog } from "./reminders-resetModal";

interface ReminderCardProps {
  reminder: any;
  reminderId: any;
  today?: Date;
}

const defaultProps = {
  today: new Date(),
};

export const ReminderCard = ({ reminder, reminderId, today }: ReminderCardProps) => {
  const [level, setLevel] = useState("info");
  const [daysTillTitle, setDaysTillTitle] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let next = getNextOccurance(new Date(reminder.date), reminder.typeOfOccurance, reminder.day);
    let daysTill = DaysBetweenDate(today, next);

    let level = daysTill <= 3 ? "error" : daysTill <= 7 ? "warning" : "success";
    setLevel(level);

    let title = isToday(next) ? "Today" : formatDistanceToNow(next, { addSuffix: true });
    setDaysTillTitle(title);
  }, [reminder]);

  const Icon = () => {
    let base = (
      <Avatar
        sx={{
          backgroundColor: `${level}.main`,
          height: 56,
          width: 56,
        }}
      >
        {level === "error" ? (
          <DangerousIcon data-testid={"error-icon"} />
        ) : level === "warning" ? (
          <WarningAmberIcon data-testid={"warning-icon"} />
        ) : (
          <DoneIcon data-testid={"success-icon"} />
        )}
      </Avatar>
    );
    return base;
  };

  return (
    <Card data-testid={"reminder-card"}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textPrimary" variant="h5">
              {reminder.name}
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Last: {format(reminder.date, "PP")}
            </Typography>
            <br />
            <Typography color="textSecondary" gutterBottom variant="overline">
              Next: {daysTillTitle}
            </Typography>
          </Grid>

          <Grid item>
            {Icon()}
            <ResetDialog
              open={open}
              setOpen={setOpen}
              reminder={reminder}
              reminderId={reminderId}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

ReminderCard.defaultProps = defaultProps;
