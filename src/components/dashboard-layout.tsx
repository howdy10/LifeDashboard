import { useState, useEffect, useContext, useMemo } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseApp } from "../firebase/clientApp";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { LoadingComponent } from "./loading-component";
import { GetFamilyBaseUrl } from "../hooks/account";
import { useAppDispatch } from "../app/hooks";
import { setUser, setFamilyIdBaseUrl } from "../app/sessionSlice";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

export const DashboardLayout = (props) => {
  const { children } = props;

  const dispatch = useAppDispatch();

  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [user, userLoading, error] = useAuthState(getAuth(firebaseApp));

  useEffect(() => {
    if (!(user || userLoading)) {
      router.push("/auth");
    } else {
      dispatch(setUser(user));
    }
  }, [user, userLoading]);
  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <LoadingComponent loading={userLoading} error={error}>
            {user && (
              <DashboardLayout2 {...props} user={user}>
                {children}
              </DashboardLayout2>
            )}
          </LoadingComponent>
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
    </>
  );
};

const DashboardLayout2 = ({ user, ...props }) => {
  const { children } = props;

  const [keys, loading, error] = GetFamilyBaseUrl();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (keys && !loading) {
      dispatch(setFamilyIdBaseUrl(keys));
    } else if (error && !loading) {
      console.error("No family id set to account");
    }
  }, [keys]);

  return (
    <LoadingComponent loading={loading} error={error}>
      {keys && children}
    </LoadingComponent>
  );
};
