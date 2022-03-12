import { useState, useMemo, useEffect, useContext } from "react";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebase } from "../firebase/clientApp";
import { BudgetUrl } from "src/firebase/databaseConstants";
import AppContext from "src/context/AppContext";

export const GetPayChecks = (year, month) => {
  const database = getDatabase(firebase);
  const value = useContext(AppContext);

  const [total, setTotal] = useState({
    total: 0,
    payChecks: [],
  });

  const [payChecks, loading, error] = useObjectVal(
    ref(database, value.state.familyIdBaseUrl + BudgetUrl + "/" + year + "/" + month + "/payChecks")
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
  const value = useContext(AppContext);
  const [currentSpent, loading, error] = useObjectVal(
    ref(database, value.state.familyIdBaseUrl + BudgetUrl + "/current")
  );

  const resArray = [currentSpent, loading, error];
  return useMemo(() => resArray, resArray);
};

export const GetCurrentBalance = (year, month) => {
  const database = getDatabase(firebase);
  const value = useContext(AppContext);

  const lastMonth = month - 1;

  const [balance, setBalance] = useState({
    bankAmount: 0,
    afterCreditCard: 0,
  });
  const [previousBalance, loading, error] = useObjectVal(
    ref(
      database,
      value.state.familyIdBaseUrl + BudgetUrl + "/" + year + "/" + lastMonth + "/endingBalance"
    )
  );
  const [payChecks, currentLoading, currentError] = useObjectVal(
    ref(database, value.state.familyIdBaseUrl + BudgetUrl + "/" + year + "/" + month + "/payChecks")
  );
  const [currentSpent, infoLoading, infoError] = useObjectVal(
    ref(database, value.state.familyIdBaseUrl + BudgetUrl + "/current")
  );

  useEffect(() => {
    let paidThisMonth = 0;
    if (payChecks) {
      Object.keys(payChecks).map((key, index) => (paidThisMonth += payChecks[key].amount));
    }
    let currentBalance = previousBalance + paidThisMonth - currentSpent?.spent;

    setBalance({
      ...balance,
      bankAmount: currentBalance + currentSpent?.creditCard,
      afterCreditCard: currentBalance,
    });
  }, [previousBalance, currentSpent, payChecks]);

  const resArray = [balance, loading, error];
  return useMemo(() => resArray, resArray);
};
