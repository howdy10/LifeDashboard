import { useState, cloneElement } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

export const DateSelector = ({ children }) => {
  const today = new Date();
  const SelectedDateVar = new Date();
  const [selectedDate, setSelectedDate] = useState(SelectedDateVar);
  const [selectedMonth, setSelectedMonth] = useState(SelectedDateVar.getMonth());
  const [selectedYear, setSelectedYear] = useState(SelectedDateVar.getFullYear());

  const handlePreviousMonth = () => {
    selectedDate.setMonth(selectedDate.getMonth() - 1);
    setSelectedDate(selectedDate);
    setSelectedMonth(selectedDate.getMonth());
    setSelectedYear(selectedDate.getFullYear());
  };

  const handleNextMonth = () => {
    selectedDate.setMonth(selectedDate.getMonth() + 1);
    setSelectedDate(selectedDate);
    setSelectedMonth(selectedDate.getMonth());
    setSelectedYear(selectedDate.getFullYear());
  };
  return (
    <>
      <Box sx={{ marginBottom: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          color="primary"
          variant="contained"
          onClick={handlePreviousMonth}
          sx={{ mr: 1 }}
          disabled={0 === selectedMonth && 2022 === selectedYear}
        >
          Previous
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleNextMonth}
          sx={{ mr: 1 }}
          disabled={today.getMonth() === selectedMonth && today.getFullYear() === selectedYear}
        >
          Next
        </Button>
      </Box>
      {cloneElement(children, { month: selectedMonth, year: selectedYear })}
    </>
  );
};
