import "./date.extensions";
export type Occurance = "days" | "monthDay" | "dayOfWeek";
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function MonthName(month: number) {
  return monthNames[month];
}

export function DaysBetweenDate(firstDate, secondDate) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round((secondDate - firstDate) / oneDay);
}

export function getNextOccurance(date: Date, typeOfOccurance: Occurance, day: number) {
  switch (typeOfOccurance) {
    case "days":
      return date.addDays(day);
    case "monthDay":
      if (date.getDate() > day) {
        date = date.nextMonth();
      }
      date.setDate(day);
      return date;
    case "dayOfWeek":
      date.setDate(1);
      while (date.getDay() !== day) {
        date.setDate(date.getDate() + 1);
      }
      if (date.getDate() > day) {
        date = date.nextMonth();
        date.setDate(1);
        while (date.getDay() !== day) {
          date.setDate(date.getDate() + 1);
        }
      }
      return date;
    default:
      return new Date();
  }
}
