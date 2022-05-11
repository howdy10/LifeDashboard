import { useState, useMemo, useEffect, useContext } from "react";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebase } from "../firebase/clientApp";
import { BucketsUrl, SavingsTransactionsUrl, SavingsUrl } from "../firebase/databaseConstants";
import AppContext from "../context/AppContext";

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
    name: null,
  });
  const [bucketTransactions, loading, error] = useObjectVal(
    ref(database, value.state.familyIdBaseUrl + SavingsUrl + "/bucketTransactions/" + bucketId)
  );
  const [bucketInfo, infoLoading, infoError] = useObjectVal(
    ref(database, value.state.familyIdBaseUrl + SavingsUrl + "/buckets/" + bucketId)
  );

  useEffect(() => {
    let current = 0;
    if (bucketTransactions) {
      Object.keys(bucketTransactions).map(
        (key, index) => (current += bucketTransactions[key].amount)
      );
    }

    if (bucketInfo || bucketId === "emergencyFund") {
      setSavingsTotal({
        ...setSavingsTotal,
        amount: current,
        transactions: bucketTransactions ?? [],
        name: bucketInfo?.name ?? "Emergency Fund",
      });
    } else {
      setSavingsTotal({
        ...setSavingsTotal,
        amount: 0,
        transactions: [],
        name: null,
      });
    }
  }, [bucketTransactions, bucketInfo]);

  const resArray = [savingsTotal, loading, error];
  return useMemo(() => resArray, resArray);
};
