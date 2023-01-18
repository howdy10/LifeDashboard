import { useState, useMemo, useEffect } from "react";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal, useListVals } from "react-firebase-hooks/database";
import { firebaseApp } from "../firebase/clientApp";
import { HsaTransactionsUrl, HsaCategoryUrl } from "../firebase/databaseLinks";
import { HookReponse } from "./types";
import { forEachFirebase } from "../firebase/utils";

export interface hsaTransactionDb {
  amount: number;
  category: string;
  date: number;
  notes: string;
  vendor: string;
}

interface hsaInfo {
  total: number;
  transactions: hsaTransactionDb[];
  categorySplit: Map<string, number>;
}

export const GetHsaCategories = (): HookReponse<string[]> => {
  const database = getDatabase(firebaseApp);

  return useListVals<string>(ref(database, HsaCategoryUrl()));
};

export const GetHsaInfo = (year: number): HookReponse<hsaInfo> => {
  const database = getDatabase(firebaseApp);

  const [snapshot, loading, error] = useObjectVal<hsaTransactionDb[]>(
    ref(database, HsaTransactionsUrl(year))
  );
  const [HsaInfo, setHsaInfo] = useState<hsaInfo>({
    total: 0,
    transactions: [],
    categorySplit: new Map<string, number>(),
  });

  useEffect(() => {
    let totalPaid = 0;
    let categoryMap = new Map<string, number>();
    categoryMap.set("Uncategorized", 0);
    if (snapshot) {
      forEachFirebase(snapshot, (value) => {
        totalPaid += value.amount;
        if (value.category) {
          if (!categoryMap.has(value.category)) {
            categoryMap.set(value.category, 0);
          }
          categoryMap.set(value.category, categoryMap.get(value.category) + value.amount);
        } else {
          categoryMap.set("Uncategorized", categoryMap.get("Uncategorized") + value.amount);
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

  const resArray: HookReponse<hsaInfo> = [HsaInfo, loading, error];
  return useMemo(() => resArray, resArray);
};
