import { useApp } from "../ThemedApp";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Add as AddIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Notifications as NotiIcon,
} from "@mui/icons-material";
import { useQuery } from "react-query";
import { fetchNotis } from "../libs/fetcher";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const {
    showForm,
    setShowForm,
    mode,
    setMode,
    setShowDrawer,
    showDrawer,
    auth,
  } = useApp();
  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery(["notis", auth], fetchNotis);
  function notiCount() {
    if (!auth) return 0;
    if (isLoading || isError) return 0;
    return data.filter((noti) => !noti.read).length;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => setShowDrawer(!showDrawer)}
        >
          <MenuIcon />
        </IconButton>
        <Typography sx={{ flexGrow: 1, ml: 2 }}>Yaycha</Typography>
        <Box>
          <IconButton color="inherit" onClick={() => setShowForm(!showForm)}>
            <AddIcon />
          </IconButton>
          {auth && (
            <IconButton color="inherit" onClick={() => navigate("/notis")}>
              <Badge color="error" badgeContent={notiCount()}>
                <NotiIcon />
              </Badge>
            </IconButton>
          )}
          {mode === "dark" ? (
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setMode("light")}
            >
              <LightModeIcon />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setMode("dark")}
            >
              <DarkModeIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
