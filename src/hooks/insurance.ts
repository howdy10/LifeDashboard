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
  balanceRemaining: number;
  memberBalance: Map<string, number>;
}

export const GetInsuranceInfo = (year: number): HookReponse<insuranceInfo> => {
  const database = getDatabase(firebaseApp);

  const [insurance, loading, error] = useObjectVal<insuranceDb>(ref(database, InsuranceUrl(year)));
  const [insuranceInfo, setInsuranceInfo] = useState<insuranceInfo>({
    totalPaid: 0,
    percentPaid: 0,
    balanceRemaining: 0,
    deductible: 0,
    claims: [],
    outOfPocket: 0,
    providers: [],
    memberBalance: new Map(),
  });

  useEffect(() => {
    let totalPaid = 0;
    let percentPaid = 0;
    let balanceRemaining = 0;
    const breakdownMap = new Map();

    if (insurance?.claims) {
      forEachFirebase(insurance.claims, (value) => {
        totalPaid += value.cost;
        balanceRemaining += !value.paid ? value.cost : 0;

        let currentBill = value.cost;
        currentBill += breakdownMap.has(value.person) ? breakdownMap.get(value.person) : 0;
        breakdownMap.set(value.person, currentBill);
      });
      percentPaid = Math.trunc((totalPaid * 100) / insurance.deductible);
    }
    setInsuranceInfo({
      ...setInsuranceInfo,
      totalPaid: totalPaid,
      percentPaid: percentPaid,
      balanceRemaining: balanceRemaining,
      deductible: insurance.deductible,
      outOfPocket: insurance.outOfPocket,
      claims: insurance.claims,
      providers: insurance.providers,
      memberBalance: breakdownMap,
    });
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
