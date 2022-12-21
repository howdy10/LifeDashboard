import { useState, useMemo, useEffect } from "react";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebase } from "../firebase/clientApp";
import { BudgetUrl } from "../firebase/databaseConstants";
import { useAppSelector } from "../app/hooks";
import { selectFamilyBaseUrl } from "../app/sessionSlice";

export const GetPayChecks = (year, month) => {
  const database = getDatabase(firebase);
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);

  const [total, setTotal] = useState({
    total: 0,
    payChecks: [],
  });

  const [payChecks, loading, error] = useObjectVal(
    ref(database, familyIdBaseUrl + BudgetUrl + "/" + year + "/" + month + "/payChecks")
  );

  useEffect(() => {
    let paidThisMonth = 0;
    if (payChecks) {
      Object.keys(payChecks).map((key, index) => (paidThisMonth += payChecks[key].amount));
    }
    setTotal({
      ...total,
      total: paidThisMonth,
      payChecks: payChecks,
    });
  }, [payChecks]);

  const resArray = [total, loading, error];
  return useMemo(() => resArray, resArray);
};

export const GetCurrentStats = () => {
  const database = getDatabase(firebase);
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);
  const [currentSpent, loading, error] = useObjectVal(
    ref(database, familyIdBaseUrl + BudgetUrl + "/current")
  );

  const resArray = [currentSpent, loading, error];
  return useMemo(() => resArray, resArray);
};

export const GetCurrentBalance = (year, month) => {
  const database = getDatabase(firebase);
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);

  const lastMonth = month - 1;

  const [balance, setBalance] = useState({
    bankAmount: 0,
    afterCreditCard: 0,
    total: 0,
    payChecks: [],
    spent: 0,
    creditCard: 0,
  });
  const [previousBalance, prevLoading, prevError] = useObjectVal(
    ref(database, familyIdBaseUrl + BudgetUrl + "/" + year + "/" + lastMonth + "/endingBalance")
  );
  const [currentMonth, loading, error] = useObjectVal(
    ref(database, familyIdBaseUrl + BudgetUrl + "/" + year + "/" + month)
  );
  const [currentSpent, infoLoading, infoError] = useObjectVal(
    ref(database, familyIdBaseUrl + BudgetUrl + "/creditCard")
  );

  useEffect(() => {
    let paidThisMonth = 0;
    let monthSpent = currentMonth?.spent ?? 0;
    if (currentMonth?.payChecks) {
      Object.keys(currentMonth.payChecks).map(
        (key, index) => (paidThisMonth += currentMonth.payChecks[key].amount)
      );
    }
    let currentBalance = previousBalance + paidThisMonth - monthSpent;

    setBalance({
      ...balance,
      bankAmount: currentBalance + currentSpent,
      afterCreditCard: currentBalance,
      total: paidThisMonth,
      payChecks: currentMonth?.payChecks,
      spent: monthSpent,
      creditCard: currentSpent,
    });
  }, [previousBalance, currentSpent, currentMonth]);

  const resArray = [balance, loading, error];
  return useMemo(() => resArray, resArray);
};
