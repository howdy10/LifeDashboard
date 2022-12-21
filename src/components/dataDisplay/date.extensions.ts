export {};
declare global {
  interface Date {
    addDays(days: number): Date;
    nextMonth(): Date;
    addMonths(months: number): Date;
    monthName(): string;
  }
}

Date.prototype.addDays = function (days: number): Date {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

Date.prototype.nextMonth = function (): Date {
  var date = new Date(this.valueOf());
  return date.addMonths(1);
};

Date.prototype.addMonths = function (months: number): Date {
  var date = new Date(this.valueOf());
  date.setMonth(date.getMonth() + months);
  return date;
};

Date.prototype.monthName = function (): string {
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
  var date = new Date(this.valueOf());
  return monthNames[date.getMonth()];
};
