import { useState, useMemo, useEffect, useContext } from "react";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebaseApp } from "../firebase/clientApp";
import { BucketsUrl, SavingsTransactionsUrl, SavingsUrl } from "../firebase/databaseConstants";
import { useAppSelector } from "../app/hooks";
import { selectFamilyBaseUrl } from "../app/sessionSlice";
import { HookReponse } from "./types";

interface SavingsDashboardCard {
  name: string;
  amount: number;
  goal: number;
}

interface SavingsBucket {
  amount: number;
  goal: number;
}
interface Bucket {
  amount: number;
  transactions: TransactionDB[];
  name: string;
}
interface TransactionDB {
  amount: number;
  bucket: string;
  bucketId: string;
  date: Date;
  note: string;
}

interface BucketDb {
  amount: number;
  bucketTransactions: string;
  completed: boolean;
  goal: number;
  name: string;
}
interface EmergencyBucketDb {
  amount: number;
  bucketTransactions: string;
  nonDecreasing: boolean;
  goal: number;
  name: string;
}

export const GetSavingsAccountDashboardCard = (): HookReponse<SavingsDashboardCard> => {
  const database = getDatabase(firebaseApp);
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);

  const [snapshot, loading, error] = useObjectVal(
    ref(database, familyIdBaseUrl + SavingsTransactionsUrl)
  );

  const [savingsTotal, setSavingsTotal] = useState<SavingsDashboardCard>({
    amount: 0,
    goal: 0,
    name: "Savings",
  });

  useEffect(() => {
    let savingsSum = 0;
    if (snapshot) {
      Object.keys(snapshot).map((key, index) => (savingsSum += snapshot[key].amount ?? 0));
    }
    setSavingsTotal({
      ...savingsTotal,
      amount: savingsSum,
    });
  }, [snapshot]);

  const resArray: HookReponse<SavingsDashboardCard> = [savingsTotal, loading, error];
  return useMemo(() => resArray, resArray);
};

export const GetSavingsBucketDashboardCard = (
  bucketId: string
): HookReponse<SavingsDashboardCard> => {
  const database = getDatabase(firebaseApp);
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);

  const [savingsBucketTotal, setSavingsBucketTotal] = useState<SavingsDashboardCard>({
    amount: 0,
    goal: 0,
    name: null,
  });
  const [bucketTransactions, loading, error] = useObjectVal(
    ref(database, familyIdBaseUrl + SavingsUrl + "/bucketTransactions/" + bucketId)
  );
  const [bucketInfo, infoLoading, infoError] = useObjectVal(
    ref(database, familyIdBaseUrl + SavingsUrl + "/buckets/" + bucketId)
  );

  useEffect(() => {
    let current = 0;
    if (bucketTransactions) {
      Object.keys(bucketTransactions).map(
        (key, index) => (current += bucketTransactions[key].amount)
      );
    }

    if (bucketInfo || bucketId === "emergencyFund") {
      setSavingsBucketTotal({
        ...savingsBucketTotal,
        amount: current,
        name: bucketInfo?.name ?? "Emergency Fund",
      });
    }
  }, [bucketTransactions, bucketInfo]);

  const resArray: HookReponse<SavingsDashboardCard> = [
    savingsBucketTotal,
    loading || infoLoading,
    error,
  ];
  return useMemo(() => resArray, resArray);
};

export const GetSavingsTotal = (): HookReponse<SavingsBucket> => {
  const database = getDatabase(firebaseApp);
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);

  const [snapshot, loading, error] = useObjectVal(
    ref(database, familyIdBaseUrl + SavingsTransactionsUrl)
  );
  const [buckets, bucketsLoading, bucketsError] = useObjectVal(
    ref(database, familyIdBaseUrl + BucketsUrl)
  );

  const [savingsTotal, setSavingsTotal] = useState<SavingsBucket>({
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

  const resArray: HookReponse<SavingsBucket> = [savingsTotal, loading || bucketsLoading, error];
  return useMemo(() => resArray, resArray);
};

export const GetSavingsTotalOfBucket = (bucketId: string): HookReponse<any> => {
  const database = getDatabase(firebaseApp);
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);

  const [savingsTotal, setSavingsTotal] = useState({
    amount: 0,
    transactions: [],
    name: null,
  });
  const [bucketTransactions, loading, error] = useObjectVal(
    ref(database, familyIdBaseUrl + SavingsUrl + "/bucketTransactions/" + bucketId)
  );
  const [bucketInfo, infoLoading, infoError] = useObjectVal(
    ref(database, familyIdBaseUrl + SavingsUrl + "/buckets/" + bucketId)
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

  const resArray: HookReponse<any> = [savingsTotal, loading, error];
  return useMemo(() => resArray, resArray);
};
