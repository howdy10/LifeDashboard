import { v4 as uuid } from "uuid";

export const loan = {
  id: uuid(),
  loanAmount: 21915.53,
  interestRate: 4.49,
  loanLength: 46,
  payment: 520.45,
  financeCharge: 2025.17,
  loanTotal: 23940.7,
  transactions: [
    {
      date: 1622554114000,
      amount: 1017.81,
      interest: 102.44,
    },
    {
      date: 1625146114000,
      amount: 4970.45,
      interest: 87.78,
    },
    {
      date: 1627824514000,
      amount: 3270.45,
      interest: 65.46,
    },
    {
      date: 1633094914000,
      amount: 550,
      interest: 84.19,
    },
    {
      date: 1635773314000,
      amount: 550,
      interest: 47.46,
    },
    {
      date: 1638365314000,
      amount: 550,
      interest: 45.55,
    },
  ],
};
