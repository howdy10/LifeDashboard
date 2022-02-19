import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";

export const LoadingComponent = ({ loading, error, children }) => {
  useEffect(() => {
    if (error && !loading) {
      console.error(error);
    }
  }, [error, loading]);

  return loading ? <CircularProgress /> : error ? "error" : children;
};
