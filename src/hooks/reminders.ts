import { useState, useMemo, useEffect, useContext } from "react";
import { formatDistance, formatDistanceToNow, differenceInCalendarDays } from "date-fns";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebaseApp } from "../firebase/clientApp";
import { RemindersUrl } from "../firebase/databaseConstants";
import { useAppSelector } from "../app/hooks";
import { selectFamilyBaseUrl } from "../app/sessionSlice";
import { HookReponse } from "./types";
import { DaysBetweenDate, getNextOccurance } from "../components/dataDisplay/date-util";

export const GetReminders = (): HookReponse<any> => {
  const database = getDatabase(firebaseApp);
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);
  const today = new Date();

  const [list, setList] = useState(null);

  const [response, loading, error] = useObjectVal(ref(database, familyIdBaseUrl + RemindersUrl));

  useEffect(() => {
    if (response) {
      Object.keys(response).map((key, index) => {
        const next = getNextOccurance(
          new Date(response[key].date),
          response[key].typeOfOccurance,
          response[key].day
        );
        response[key].daysTill = DaysBetweenDate(today, next);
        response[key].next = formatDistanceToNow(next, { addSuffix: true });
      });
    }
    setList(response);
  }, [response]);

  const resArray: HookReponse<any> = [list, loading, error];
  return useMemo(() => resArray, resArray);
};
