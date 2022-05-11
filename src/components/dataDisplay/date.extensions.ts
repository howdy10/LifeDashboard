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

interface Date {
  addDays(days: number): Date;
  addMonths(months: number): Date;
  nextMonth(): Date;
  monthName(): string;
}

Date.prototype.addDays = function (days: number) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

Date.prototype.nextMonth = function () {
  var date = new Date(this.valueOf());
  return date.addMonths(1);
};

Date.prototype.addMonths = function (months: number) {
  var date = new Date(this.valueOf());
  date.setMonth(date.getMonth() + months);
  return date;
};

Date.prototype.monthName = function () {
  var date = new Date(this.valueOf());
  return monthNames[date.getMonth()];
};
