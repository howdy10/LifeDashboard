import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import { useEffect } from "react";

export interface LoadingComponentProps {
  loading: boolean;
  error: Error | undefined;
  children: JSX.Element | JSX.Element[] | undefined | null;
}

export const LoadingComponent = ({ loading, error, children }: LoadingComponentProps) => {
  useEffect(() => {
    if (error && !loading) {
      console.error(error);
    }
  }, [error, loading]);
  const output = loading ? <CircularProgress /> : error ? <Typography>Error</Typography> : children;
  return <React.Fragment>{output}</React.Fragment>;
};
