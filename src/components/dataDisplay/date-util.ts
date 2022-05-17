import "./date.extensions";

export enum TypeOfOccuranceType {
  days = "days",
  monthDay = "monthDay",
  dayOfWeek = "dayOfWeek",
}

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

export function MonthName(month: number): string {
  return monthNames[month];
}

export function DaysBetweenDate(firstDate, secondDate): number {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round((secondDate - firstDate) / oneDay);
}

export function getNextOccurance(
  date: Date,
  typeOfOccurance: TypeOfOccuranceType,
  day: number
): Date {
  switch (typeOfOccurance) {
    case TypeOfOccuranceType.days:
      return date.addDays(day);
    case TypeOfOccuranceType.monthDay:
      if (date.getDate() > day) {
        date = date.nextMonth();
      }
      date.setDate(day);
      return date;
    case TypeOfOccuranceType.dayOfWeek:
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
