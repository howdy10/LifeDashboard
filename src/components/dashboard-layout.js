import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { userContext } from "../context/userContext";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/clientApp";
import { useRouter } from "next/router";

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

  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [user, userLoading, error] = useAuthState(firebase.auth());

  useEffect(() => {
    if (!(user || userLoading)) {
      router.push("/auth");
    }
  }, [user, userLoading]);

  return (
    <userContext.Provider value={{ user, userLoading }}>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
    </userContext.Provider>
  );
};
