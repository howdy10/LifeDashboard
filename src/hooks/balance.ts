import { useState, useMemo, useEffect } from "react";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebaseApp } from "../firebase/clientApp";
import { BalanceUrl } from "../firebase/databaseConstants";
import { useAppSelector } from "../app/hooks";
import { selectFamilyBaseUrl } from "../app/sessionSlice";
import { subMonths, getMonth, getYear } from "date-fns";
import { HookReponse } from "./types";

interface monthIncome {
  total: number;
  payChecks: payChecksDB;
}

export interface payChecksDB {
  [key: string]: payCheckDB;
}

interface payCheckDB {
  amount: number;
  date: number;
}

interface monthInfoDb {
  endingBalance: number;
  spent: number;
  payChecks: payChecksDB;
}

interface monthInfo {
  bankAmount: number;
  afterCreditCard: number;
  total: number;
  payChecks: payChecksDB;
  spent: number;
  creditCard: number;
}

export const GetPayChecks = (year: number, month: number): HookReponse<monthIncome> => {
  const database = getDatabase(firebaseApp);
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);

  const [total, setTotal] = useState<monthIncome>({
    total: 0,
    payChecks: undefined,
  });

  const [payChecks, loading, error] = useObjectVal<payChecksDB>(
    ref(database, familyIdBaseUrl + BalanceUrl + "/" + year + "/" + month + "/payChecks")
  );

  useEffect(() => {
    let paidThisMonth = 0;
    if (payChecks) {
      Object.keys(payChecks).map((key, index) => (paidThisMonth += payChecks[key].amount));
    }
    setTotal({
      ...total,
      total: paidThisMonth,
      payChecks: payChecks,
    });
  }, [payChecks]);

  const resArray: HookReponse<monthIncome> = [total, loading, error];
  return useMemo(() => resArray, resArray);
};

export const GetCurrentBalance = (year: number, month: number): HookReponse<monthInfo> => {
  const ThisDate = new Date(year, month);

  return GetCurrentBalanceDate(ThisDate);
};

export const GetCurrentBalanceDate = (currentDate: Date): HookReponse<monthInfo> => {
  const database = getDatabase(firebaseApp);
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);

  const LastMonth = subMonths(currentDate, 1);

  const [balance, setBalance] = useState<monthInfo>({
    bankAmount: 0,
    afterCreditCard: 0,
    total: 0,
    payChecks: undefined,
    spent: 0,
    creditCard: 0,
  });
  const [previousBalance, prevLoading, prevError] = useObjectVal<number>(
    ref(
      database,
      familyIdBaseUrl +
        BalanceUrl +
        "/" +
        getYear(LastMonth) +
        "/" +
        getMonth(LastMonth) +
        "/endingBalance"
    )
  );
  const [currentMonth, loading, error] = useObjectVal<monthInfoDb>(
    ref(
      database,
      familyIdBaseUrl + BalanceUrl + "/" + getYear(currentDate) + "/" + getMonth(currentDate)
    )
  );
  const [currentSpent, infoLoading, infoError] = useObjectVal<number>(
    ref(database, familyIdBaseUrl + BalanceUrl + "/creditCard")
  );

  useEffect(() => {
    let paidThisMonth = 0;
    let monthSpent = currentMonth?.spent ?? 0;
    if (currentMonth?.payChecks) {
      Object.keys(currentMonth.payChecks).map(
        (key, index) => (paidThisMonth += currentMonth.payChecks[key].amount)
      );
    }
    let currentBalance = previousBalance + paidThisMonth - monthSpent;

    setBalance({
      ...balance,
      bankAmount: currentBalance + currentSpent,
      afterCreditCard: currentBalance,
      total: paidThisMonth,
      payChecks: currentMonth?.payChecks,
      spent: monthSpent,
      creditCard: currentSpent,
    });
  }, [previousBalance, currentSpent, currentMonth]);

  const resArray: HookReponse<monthInfo> = [balance, loading || infoLoading || prevLoading, error];
  return useMemo(() => resArray, resArray);
};
