export function MoneyFormatter(number) {
  if (isNaN(number)) {
    return "NaN";
  }
  return Number(number).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
export function WholeMoneyFormatter(number) {
  if (isNaN(number)) {
    return "NaN";
  }
  return Number(number / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
