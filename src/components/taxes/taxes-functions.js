const taxBracket = [
  { min: 0, max: 1990000, taxRate: 0.1 },
  { min: 1990001, max: 8105000, taxRate: 0.12 },
  { min: 8105001, max: 17275000, taxRate: 0.22 },
  { min: 17275001, max: 32985000, taxRate: 0.24 },
  { min: 32985001, max: 41885000, taxRate: 0.32 },
  { min: 41885001, max: 62830000, taxRate: 0.35 },
  { min: 62830001, max: 100000000, taxRate: 0.37 },
];
const stdDeduction = 2510000;

export function calculateTaxBillWithStandardDeduction(income) {
  return calculateTaxBill(income - stdDeduction);
}

export function calculateTaxBill(taxableIncome) {
  let taxBill = 0;

  taxBracket
    .filter((x) => taxableIncome > x.min)
    .forEach((b) => {
      if (taxableIncome >= b.max) {
        taxBill += Math.round((b.max - b.min) * b.taxRate);
      } else {
        let current = taxableIncome - b.min;
        taxBill += Math.round(current * b.taxRate);
      }
    });

  return taxBill;
}
