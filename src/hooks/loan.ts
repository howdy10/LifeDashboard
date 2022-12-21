import { useState, useMemo, useEffect } from "react";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebaseApp } from "../firebase/clientApp";
import { AllLoansUrl } from "../firebase/databaseLinks";
import { HookReponse } from "./types";

const defaultValues = {
  remainingBalance: 0,
  interestPaid: 0,
  totalPaid: 0,
  principalPaid: 0,
  escrowBalance: 0,
  name: null,
  percentPaid: 0,
};
export const GetLoanDetails = (loanId: string): HookReponse<any> => {
  const database = getDatabase(firebaseApp);

  const [resArray, setResArray] = useState<HookReponse<any>>([defaultValues, true, undefined]);

  const [loan, loading, error] = useObjectVal<any>(ref(database, AllLoansUrl() + "/" + loanId));

  useEffect(() => {
    let totalPaid = 0;
    let interestPaid = 0;
    let escrowPaid = 0;

    if (loan && loan.transactions) {
      Object.keys(loan.transactions).map((key, index) => {
        totalPaid += loan.transactions[key].amount;
        interestPaid += loan.transactions[key].interest;
        escrowPaid += loan.transactions[key].escrow ?? 0;
      });

      let loanTotal = {
        remainingBalance: loan.loanAmount - totalPaid + interestPaid + escrowPaid,
        interestPaid: interestPaid,
        totalPaid: totalPaid,
        principalPaid: totalPaid - interestPaid - escrowPaid,
        escrowBalance: escrowPaid,
        name: loan.name,
        percentPaid: Math.trunc(
          ((loan.loanAmount - (loan.loanAmount - totalPaid + interestPaid + escrowPaid)) /
            loan.loanAmount) *
            100
        ),
      };

      setResArray([loanTotal, loading, error]);
    }
  }, [loan, loading, error]);

  return useMemo(() => resArray, [resArray]);
};
