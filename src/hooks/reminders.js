import { useState, useMemo, useEffect, useContext } from "react";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebase } from "../firebase/clientApp";
import { RemindersUrl } from "../firebase/databaseConstants";
import { useAppSelector } from "../../app/hooks";
import { selectFamilyBaseUrl } from "../../app/sessionSlice";

export const GetReminders = () => {
  const database = getDatabase(firebase);
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);

  const [total, setTotal] = useState({
    reminders: [],
  });

  const [list, loading, error] = useObjectVal(ref(database, familyIdBaseUrl + RemindersUrl));

  useEffect(() => {
    // if (payChecks) {
    //   Object.keys(payChecks).map((key, index) => (paidThisMonth += payChecks[key].amount));
    // }
    setTotal({
      ...total,
      reminders: list,
    });
  }, [list]);

  const resArray = [total, loading, error];
  return useMemo(() => resArray, resArray);
};
