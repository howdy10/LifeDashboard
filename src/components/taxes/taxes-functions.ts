const taxBracketFirst = [
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

  taxBracketFirst
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
//const standardDeduction = 24800;
const standardDeduction = 2510000;
// The tax rates for 2022 for married individuals filing jointly are:
// 10% on taxable income up to $19,900
// 12% on taxable income between $19,901 and $81,050
// 22% on taxable income between $81,051 and $172,750
// 24% on taxable income between $172,751 and $329,850
// 32% on taxable income between $329,851 and $418,850
// 35% on taxable income between $418,851 and $628,300
// 37% on taxable income over $628,300
const taxBracketAll = [
  { bracketBelowTotal: 0, max: 1990000, taxRate: 0.1 },
  { bracketBelowTotal: 199000, max: 8105000, taxRate: 0.12 },
  { bracketBelowTotal: 923900, max: 17275000, taxRate: 0.22 },
  { bracketBelowTotal: 2921100, max: 32985000, taxRate: 0.24 },
  { bracketBelowTotal: 6657100, max: 41885000, taxRate: 0.32 },
  { bracketBelowTotal: 9442700, max: 62830000, taxRate: 0.35 },
  { bracketBelowTotal: 16730700, max: 0, taxRate: 0.37 },
];
export function calculateTaxes(
  income: number,
  useStandardDeduction: boolean,
  deductions: number = 0
): number {
  let taxableIncome: number;
  if (useStandardDeduction) {
    taxableIncome = income - standardDeduction;
  } else {
    taxableIncome = income - deductions;
  }
  const taxBrackets = taxBracketAll;
  let taxesOwed: number;

  const taxBracketIndex = taxBrackets.findIndex((x) => taxableIncome < x.max);

  if (taxBracketIndex == 0) {
    taxesOwed = taxableIncome * taxBrackets[0].taxRate;
  }
  taxesOwed =
    taxBrackets[taxBracketIndex].bracketBelowTotal +
    (taxableIncome - taxBrackets[taxBracketIndex - 1].max) * taxBrackets[taxBracketIndex].taxRate;

  return taxesOwed;
}
