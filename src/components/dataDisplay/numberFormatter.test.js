import { MoneyFormatter } from "./numberFormatter";

test("Test whole money formatter", () => {
  expect(MoneyFormatter(50)).toBe("$50.00");
});

test("Tests decimal number", () => {
  expect(MoneyFormatter(30.21)).toBe("$30.21");
});

test("Test non numeric value", () => {
  expect(MoneyFormatter("e")).toBe("NaN");
  expect(MoneyFormatter("#43")).toBe("NaN");
  expect(MoneyFormatter("$43")).toBe("NaN");
});

test("Tests large decimal number", () => {
  expect(MoneyFormatter(30.2143)).toBe("$30.21");
});

test("Test string money value formatter", () => {
  expect(MoneyFormatter("50.3")).toBe("$50.30");
});

test("Test negative money formatter", () => {
  expect(MoneyFormatter(-50)).toBe("-$50.00");
  expect(MoneyFormatter("-43")).toBe("-$43.00");
  expect(MoneyFormatter("+43.50")).toBe("$43.50");
});
