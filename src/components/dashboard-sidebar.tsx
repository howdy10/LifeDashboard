import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Divider, Drawer, useMediaQuery } from "@mui/material";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SavingsIcon from "@mui/icons-material/Savings";
import { useTheme } from "@mui/material/styles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { XCircle as XCircleIcon } from "../icons/x-circle";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";

const items = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },
  { href: "/balance", icon: <AccountBalanceIcon fontSize="small" />, title: "Bank Account" },
  {
    href: "/savings",
    icon: <SavingsIcon fontSize="small" />,
    title: "Savings",
  },
  { href: "/loans", icon: <CreditCardIcon fontSize="small" />, title: "Loans" },
  {
    href: "/hsa",
    icon: <AccountBalanceWalletIcon fontSize="small" />,
    title: "HSA",
  },
  {
    href: "/insurance",
    icon: <LocalHospitalIcon fontSize="small" />,
    title: "Insurance",
  },
  {
    href: "/404",
    icon: <XCircleIcon fontSize="small" />,
    title: "Error",
  },
];
export interface DashboardSidebarProps {
  open: boolean;
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
}
export const DashboardSidebar = ({ open, onClose }: DashboardSidebarProps) => {
  const router = useRouter();
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.({}, "escapeKeyDown");
    }
  }, [router.asPath]);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div>
        <Box sx={{ p: 3 }}>
          <NextLink href="/" passHref>
            <a>
              <Logo
                sx={{
                  height: 42,
                  width: 42,
                }}
              />
            </a>
          </NextLink>
        </Box>
      </div>
      <Divider
        sx={{
          borderColor: "#2D3748",
          my: 3,
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        {items.map((item) => (
          <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
        ))}
      </Box>
      <Divider sx={{ borderColor: "#2D3748" }} />
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
