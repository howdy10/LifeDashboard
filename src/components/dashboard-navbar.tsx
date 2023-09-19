import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Bell as BellIcon } from "../icons/bell";
import LogoutIcon from "@mui/icons-material/Logout";
import firebase from "../firebase/clientApp";
import { getAuth } from "firebase/auth";
import { MouseEventHandler } from "react";

export interface DashboardNavbarProps {
  onSidebarOpen: MouseEventHandler<HTMLButtonElement>;
  props?: any[];
}

export const DashboardNavbar = ({ onSidebarOpen, ...props }: DashboardNavbarProps) => {
  const theme = useTheme();

  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <AppBar
      sx={{
        left: {
          lg: 280,
        },
        width: {
          lg: "calc(100% - 280px)",
        },
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
      }}
      {...props}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2,
        }}
      >
        <IconButton
          onClick={onSidebarOpen}
          sx={{
            display: {
              xs: "inline-flex",
              lg: "none",
            },
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <Typography color="textPrimary">{user && "Hello " + user.displayName}</Typography>
        <Typography color="textPrimary">{!user && "Please Sign in"}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Log out">
          <IconButton
            sx={{ ml: 1 }}
            onClick={() => {
              firebase.auth().signOut();
            }}
          >
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications">
          <IconButton sx={{ ml: 1 }}>
            <Badge color="primary">
              <BellIcon fontSize="small" />
            </Badge>
          </IconButton>
        </Tooltip>
        <Avatar sx={{ bgcolor: "primary.main", height: 40, width: 40, ml: 1 }}>
          {user !== null && user.displayName !== null ? user.displayName.charAt(0) : <div />}
        </Avatar>
      </Toolbar>
    </AppBar>
  );
};
