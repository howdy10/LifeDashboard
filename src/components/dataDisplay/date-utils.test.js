import { DaysBetweenDate, getNextOccurance, TypeOfOccuranceType } from "./date-util";

test("Test X days for second date", () => {
  expect(DaysBetweenDate(new Date(2022, 0, 10), new Date(2022, 0, 15))).toBe(5);
});

test("Test X days for second date in new month", () => {
  expect(DaysBetweenDate(new Date(2022, 0, 31), new Date(2022, 1, 5))).toBe(5);
});

test("Test X days for second date in new month Feburary", () => {
  expect(DaysBetweenDate(new Date(2022, 1, 28), new Date(2022, 2, 5))).toBe(5);
});

test("Tests 0 days for second date", () => {
  expect(DaysBetweenDate(new Date(2022, 0, 15), new Date(2022, 0, 15))).toBe(0);
});

test("Tests Negative days for second date", () => {
  expect(DaysBetweenDate(new Date(2022, 0, 15), new Date(2022, 0, 10))).toBe(-5);
});

test("Test X days for second date in new Year", () => {
  expect(DaysBetweenDate(new Date(2021, 11, 30), new Date(2022, 0, 6))).toBe(7);
});

test("Get X days", () => {
  expect(getNextOccurance(new Date(2022, 0, 10), TypeOfOccuranceType.days, 7)).toStrictEqual(
    new Date(2022, 0, 17)
  );
  expect(getNextOccurance(new Date(2022, 1, 28), TypeOfOccuranceType.days, 7)).toStrictEqual(
    new Date(2022, 2, 7)
  );
  expect(getNextOccurance(new Date(2021, 11, 30), TypeOfOccuranceType.days, 7)).toStrictEqual(
    new Date(2022, 0, 6)
  );
});

test("Get X day of the month", () => {
  expect(getNextOccurance(new Date(2022, 0, 5), TypeOfOccuranceType.monthDay, 7)).toStrictEqual(
    new Date(2022, 0, 7)
  );
  expect(getNextOccurance(new Date(2021, 11, 30), TypeOfOccuranceType.monthDay, 7)).toStrictEqual(
    new Date(2022, 0, 7)
  );
});

test("Get X day of the month for next month", () => {
  expect(getNextOccurance(new Date(2022, 1, 28), TypeOfOccuranceType.monthDay, 7)).toStrictEqual(
    new Date(2022, 2, 7)
  );
});
test("Get X day of the month for next month edge feburary", () => {
  expect(getNextOccurance(new Date(2022, 0, 31), TypeOfOccuranceType.monthDay, 5)).toStrictEqual(
    new Date(2022, 2, 5)
  );
});

test("Get first saturday of the month", () => {
  expect(getNextOccurance(new Date(2022, 5, 1), TypeOfOccuranceType.dayOfWeek, 6)).toStrictEqual(
    new Date(2022, 5, 4)
  );
  expect(getNextOccurance(new Date(2022, 4, 11), TypeOfOccuranceType.dayOfWeek, 6)).toStrictEqual(
    new Date(2022, 5, 4)
  );
});
