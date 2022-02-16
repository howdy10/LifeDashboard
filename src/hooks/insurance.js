import { useState, useMemo, useEffect } from "react";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebase } from "../firebase/clientApp";
import { InsuranceUrl } from "src/firebase/databaseLinks";

export const GetInsurancePaid = () => {
  const database = getDatabase(firebase);

  const [insurance, loading, error] = useObjectVal(ref(database, InsuranceUrl()));
  const [insuranceInfo, setInsuranceInfo] = useState({
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

  const values = useMemo(() => (insurance ? insuranceInfo : null), [insuranceInfo]);

  const resArray = [values, loading, error];
  return useMemo(() => resArray, resArray);
};
