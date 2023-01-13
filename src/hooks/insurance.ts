import { useState, useMemo, useEffect } from "react";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebaseApp } from "../firebase/clientApp";
import { InsuranceUrl } from "../firebase/databaseLinks";
import { InsuranceMembersUrl, InsuranceProvidersUrl } from "../firebase/databaseConstants";
import { HookReponse } from "./types";
import { GetFromDatabaseList } from "./baseHook";
import { forEachFirebase } from "../firebase/utils";

export interface insuranceDb {
  deductible: number;
  outOfPocket: number;
  claims: claimDB[];
  members: string[];
  providers: string[];
}

export interface claimDB {
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
      forEachFirebase(insurance.claims, (value) => (totalPaid += value.cost));
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

export const GetInsuranceMembers = (): HookReponse<string[]> => {
  return GetFromDatabaseList<string>(InsuranceMembersUrl);
};
export const GetInsuranceProviders = (): HookReponse<string[]> => {
  return GetFromDatabaseList<string>(InsuranceProvidersUrl);
};
