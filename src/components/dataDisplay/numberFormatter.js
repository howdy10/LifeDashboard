export function MoneyFormatter(number) {
  if (isNaN(number)) {
    return "NaN";
  }
  return Number(number).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
