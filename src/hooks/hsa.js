import { useState, useMemo, useEffect } from "react";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal, useListVals } from "react-firebase-hooks/database";
import { firebase } from "../firebase/clientApp";
import { HsaTransactionsUrl, HsaCategoryUrl } from "../firebase/databaseLinks";

export const GetHsaCategories = () => {
  const database = getDatabase(firebase);

  return useListVals(ref(database, HsaCategoryUrl()));
};

export const GetHsaInfo = () => {
  const database = getDatabase(firebase);

  const [snapshot, loading, error] = useObjectVal(ref(database, HsaTransactionsUrl()));
  const [HsaInfo, setHsaInfo] = useState({
    total: 0,
    transactions: [],
    categorySplit: [],
  });

  useEffect(() => {
    let totalPaid = 0;
    let categoryMap = new Map();
    categoryMap.set("Uncategorized", 0);
    if (snapshot) {
      Object.keys(snapshot).map((key, index) => {
        totalPaid += snapshot[key].amount;
        if (snapshot[key].category) {
          if (!categoryMap.has(snapshot[key].category)) {
            categoryMap.set(snapshot[key].category, 0);
          }
          categoryMap.set(
            snapshot[key].category,
            categoryMap.get(snapshot[key].category) + snapshot[key].amount
          );
        } else {
          categoryMap.set("Uncategorized", categoryMap.get("Uncategorized") + snapshot[key].amount);
        }
      });

      setHsaInfo({
        ...HsaInfo,
        total: totalPaid,
        transactions: snapshot,
        categorySplit: categoryMap,
      });
    }
  }, [snapshot]);

  // const values = useMemo(() => (insurance ? insuranceInfo : null), [insuranceInfo]);

  const resArray = [HsaInfo, loading, error];
  return useMemo(() => resArray, resArray);
};
