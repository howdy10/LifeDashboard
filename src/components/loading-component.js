import CircularProgress from "@mui/material/CircularProgress";

export const LoadingComponent = ({ loading, error, children }) => {
  return loading ? <CircularProgress /> : error ? "error" : children;
};
