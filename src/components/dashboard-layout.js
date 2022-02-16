import { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/clientApp";
import { useRouter } from "next/router";
import { LoadingComponent } from "./loading-component";
import { GetFamilyBaseUrl } from "../firebase/databaseLinks";
import AppContext from "../context/AppContext";

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
  const value = useContext(AppContext);

  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [user, userLoading, error] = useAuthState(firebase.auth());

  useEffect(() => {
    if (!(user || userLoading)) {
      router.push("/auth");
    } else {
      value.setUser(user);
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
  const value = useContext(AppContext);

  useEffect(() => {
    if (keys && !loading) {
      value.setFamilyIdBaseUrl(keys);
    }
  }, [keys]);

  return (
    <LoadingComponent loading={loading} error={error}>
      {children}
    </LoadingComponent>
  );
};
