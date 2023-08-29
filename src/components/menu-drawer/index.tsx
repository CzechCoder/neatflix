import { FC, Dispatch, SetStateAction } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Person2Icon from "@mui/icons-material/Person2";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

interface MenuDrawerProps {
  drawerOpen: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  handleLogout: () => void;
}

export const MenuDrawer: FC<MenuDrawerProps> = ({
  drawerOpen,
  setOpenDrawer,
  handleLogout,
}) => {
  const navigate = useNavigate();
  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={() => setOpenDrawer(false)}
      onClick={() => setOpenDrawer(false)}
      PaperProps={{
        sx: { width: "70%" },
      }}
    >
      <Box className={styles.drawerContainer}>
        <IconButton sx={{ mb: 2 }} onClick={() => setOpenDrawer(false)}>
          <CloseIcon />
        </IconButton>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ mb: 2 }}>
          <ListItemButton disableRipple onClick={() => navigate("/mylist")}>
            <ListItemIcon>
              <SubscriptionsIcon sx={{ color: "primary.main" }} />
            </ListItemIcon>
            <ListItemText primary="My List" />
          </ListItemButton>

          <ListItemButton disableRipple onClick={() => navigate("/browse")}>
            <ListItemIcon>
              <OndemandVideoIcon sx={{ color: "primary.main" }} />
            </ListItemIcon>
            <ListItemText primary="Browse" />
          </ListItemButton>

          <ListItemButton disableRipple onClick={() => navigate("/profile")}>
            <ListItemIcon>
              <Person2Icon sx={{ color: "primary.main" }} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </Box>
        <Box className={styles.buttonWrapper}>
          <Button
            variant="contained"
            fullWidth
            sx={{ m: 1 }}
            onClick={() => handleLogout()}
          >
            Log Out
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
