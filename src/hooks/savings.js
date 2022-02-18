import { useState, useMemo, useEffect, useContext } from "react";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebase } from "../firebase/clientApp";
import { BucketsUrl, SavingsTransactionsUrl, SavingsUrl } from "src/firebase/databaseConstants";
import AppContext from "src/context/AppContext";

export const GetSavingsTotal = () => {
  const database = getDatabase(firebase);
  const value = useContext(AppContext);

  const [snapshot, loading, error] = useObjectVal(
    ref(database, value.state.familyIdBaseUrl + SavingsTransactionsUrl)
  );
  const [buckets, bucketsLoading, bucketsError] = useObjectVal(
    ref(database, value.state.familyIdBaseUrl + BucketsUrl)
  );

  const [savingsTotal, setSavingsTotal] = useState({
    amount: 0,
    goal: 0,
  });

  useEffect(() => {
    let savingsTotal = 0;
    let goalTotal = 0;
    if (buckets && snapshot) {
      Object.keys(snapshot).map((key, index) => (savingsTotal += snapshot[key].amount ?? 0));
      Object.keys(buckets).map((key, index) => (goalTotal += buckets[key].goal ?? 0));
    }
    setSavingsTotal({
      ...setSavingsTotal,
      amount: savingsTotal,
      goal: goalTotal,
    });
  }, [snapshot, buckets]);

  //   const values = useMemo(() => (snapshot && buckets ? savingsTotal : null), [snapshot, buckets]);

  const resArray = [savingsTotal, loading || bucketsLoading, error];
  return useMemo(() => resArray, resArray);
};

export const GetSavingsTotalOfBucket = (bucketId) => {
  const database = getDatabase(firebase);
  const value = useContext(AppContext);

  const [savingsTotal, setSavingsTotal] = useState({
    amount: 0,
    transactions: [],
  });
  const [bucketTransactions, loading, error] = useObjectVal(
    ref(database, value.state.familyIdBaseUrl + SavingsUrl + "/bucketTransactions/" + bucketId)
  );

  useEffect(() => {
    let current = 0;
    if (bucketTransactions) {
      Object.keys(bucketTransactions).map(
        (key, index) => (current += bucketTransactions[key].amount)
      );
    }
    setSavingsTotal({
      ...setSavingsTotal,
      amount: current,
      goal: bucketTransactions,
    });
  }, [bucketTransactions]);

  const resArray = [savingsTotal, loading, error];
  return useMemo(() => resArray, resArray);
};
