import {
  calculateTaxBill,
  calculateTaxBillWithStandardDeduction,
  calculateTaxes,
} from "./taxes-functions";

test("Test taxcalculations", () => {
  expect(calculateTaxBill(1990000)).toBe(199000);
  expect(calculateTaxBill(5595000)).toBe(631600);
  expect(calculateTaxBill(10000000)).toBe(1349700);
  expect(calculateTaxBill(10040050)).toBe(1358511);
});

test("Test taxcalculations with standard", () => {
  expect(calculateTaxBillWithStandardDeduction(10000000)).toBe(859000);
});

test("Test taxcalculations with standard", () => {
  expect(calculateTaxes(10000000, 1)).toBe(859000);
});
