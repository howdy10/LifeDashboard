import { useState, cloneElement } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

export interface DateSelectorInput {
  firstMonth: number;
  firstYear: number;
  renderItem: any; //TODO: Change to correct type
}

export const DateSelector = ({ firstMonth, firstYear, renderItem }: DateSelectorInput) => {
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
          disabled={firstMonth === selectedMonth && firstYear === selectedYear}
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
      {renderItem(selectedMonth, selectedYear)}
    </>
  );
};
