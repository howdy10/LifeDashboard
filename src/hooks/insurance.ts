import { useState, useMemo, useEffect } from "react";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebaseApp } from "../firebase/clientApp";
import { InsuranceUrl } from "../firebase/databaseLinks";
import { HookReponse } from "./types";

interface insuranceDb {
  deductible: number;
  outOfPocket: number;
  claims: calimsDB;
  members: membersDB;
  providers: providersDB;
}

interface membersDB {
  [key: string]: string;
}

interface providersDB {
  [key: string]: string;
}

interface calimsDB {
  [key: string]: claimDB;
}

interface claimDB {
  bill: boolean;
  cost: number;
  date: number;
  insurance: boolean;
  notes: string;
  paid: boolean;
  person: string;
  provider: string;
}

interface insuranceInfo {
  totalPaid: number;
  percentPaid: number;
  deductible: number;
}

export const GetInsurancePaid = (): HookReponse<insuranceInfo> => {
  const database = getDatabase(firebaseApp);

  const [insurance, loading, error] = useObjectVal<insuranceDb>(ref(database, InsuranceUrl()));
  const [insuranceInfo, setInsuranceInfo] = useState<insuranceInfo>({
    totalPaid: 0,
    percentPaid: 0,
    deductible: 0,
  });

  useEffect(() => {
    let totalPaid = 0;
    let percentPaid = 0;

    if (insurance?.claims) {
      Object.keys(insurance.claims).map((key, index) => (totalPaid += insurance.claims[key].cost));
      percentPaid = Math.trunc((totalPaid * 100) / insurance.deductible);

      setInsuranceInfo({
        ...setInsuranceInfo,
        totalPaid: totalPaid,
        percentPaid: percentPaid,
        deductible: insurance.deductible,
      });
    }
  }, [insurance]);

  const resArray: HookReponse<insuranceInfo> = [insuranceInfo, loading, error];
  return useMemo(() => resArray, resArray);
};