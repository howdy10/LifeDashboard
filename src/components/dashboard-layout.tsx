import { useState, useEffect } from "react";
import { Box } from "@mui/material";
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

export interface DashboardLayoutProps {
  children: JSX.Element;
  props?: any[];
}

export const DashboardLayout = ({ children, ...props }: DashboardLayoutProps) => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [user, userLoading, error] = useAuthState(getAuth(firebaseApp));

  useEffect(() => {
    if (!(user || userLoading)) {
      router.push("/auth");
    }
  }, [user, userLoading]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flex: "1 1 auto",
          maxWidth: "100%",
          paddingTop: 8,
          paddingLeft: {
            lg: 30,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <LoadingComponent loading={userLoading} error={error}>
            {user && <DashboardLayout2 {...props}>{children}</DashboardLayout2>}
          </LoadingComponent>
        </Box>
      </Box>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
    </>
  );
};

const DashboardLayout2 = ({ children, ...props }: DashboardLayoutProps) => {
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
