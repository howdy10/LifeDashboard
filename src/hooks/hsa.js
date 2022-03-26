import { useState, useMemo, useEffect } from "react";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebase } from "../firebase/clientApp";
import { HsaTransactionsUrl } from "src/firebase/databaseLinks";

export const GetHsaInfo = () => {
  const database = getDatabase(firebase);

  const [snapshot, loading, error] = useObjectVal(ref(database, HsaTransactionsUrl()));
  const [HsaInfo, setHsaInfo] = useState({
    total: 0,
    transactions: [],
  });

  useEffect(() => {
    let totalPaid = 0;

    if (snapshot) {
      Object.keys(snapshot).map((key, index) => (totalPaid += snapshot[key].amount));

      setHsaInfo({
        ...HsaInfo,
        total: totalPaid,
        transactions: snapshot,
      });
    }
  }, [snapshot]);

  // const values = useMemo(() => (insurance ? insuranceInfo : null), [insuranceInfo]);

  const resArray = [HsaInfo, loading, error];
  return useMemo(() => resArray, resArray);
};
