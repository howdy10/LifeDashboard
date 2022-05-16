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

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

Date.prototype.nextMonth = function () {
  var date = new Date(this.valueOf());
  return date.addMonths(1);
};

Date.prototype.addMonths = function (months) {
  var date = new Date(this.valueOf());
  date.setMonth(date.getMonth() + months);
  return date;
};

Date.prototype.monthName = function () {
  var date = new Date(this.valueOf());
  return monthNames[date.getMonth()];
};
