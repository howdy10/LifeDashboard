import { useState, useMemo, useEffect } from "react";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebaseApp } from "../firebase/clientApp";
import {
  InsuranceUrl,
  InsuranceMembersUrl,
  InsuranceProvidersUrl,
} from "../firebase/databaseLinks";
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

export interface insuranceInfo extends insuranceDb {
  totalPaid: number;
  percentPaid: number;
}

export const GetInsuranceInfo = (year: number): HookReponse<insuranceInfo> => {
  const database = getDatabase(firebaseApp);

  const [insurance, loading, error] = useObjectVal<insuranceDb>(ref(database, InsuranceUrl(year)));
  const [insuranceInfo, setInsuranceInfo] = useState<insuranceInfo>({
    totalPaid: 0,
    percentPaid: 0,
    deductible: 0,
    claims: [],
    members: [],
    outOfPocket: 0,
    providers: [],
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
        outOfPocket: insurance.outOfPocket,
        claims: insurance.claims,
        members: insurance.members,
        providers: insurance.providers,
      });
    }
  }, [insurance]);

  const resArray: HookReponse<insuranceInfo> = [insuranceInfo, loading, error];
  return useMemo(() => resArray, resArray);
};

export const GetInsuranceMembers = (): HookReponse<string[]> => {
  return GetFromDatabaseList<string>(InsuranceMembersUrl(false));
};
export const GetInsuranceProviders = (year: number): HookReponse<string[]> => {
  return GetFromDatabaseList<string>(InsuranceProvidersUrl(year, false));
};
