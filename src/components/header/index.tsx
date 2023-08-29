import { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CardMedia,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import userStore from "../../store/user-store";
import { shallow } from "zustand/shallow";
import styles from "./index.module.css";
import MenuIcon from "@mui/icons-material/Menu";

import { Theme } from "@mui/material";
import { MenuDrawer } from "../menu-drawer";

export const Header: FC = () => {
  const [session, setUser, setSession] = userStore(
    (store) => [store.session, store.setUser, store.setSession],
    shallow
  );
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUser(undefined);
    setSession("unauthorized");
    navigate("/");
  };

  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <>
      {mobile ? (
        <Box className={styles.mobileHeaderContainer}>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <CardMedia
              component="img"
              src="./neatflix-logo.png"
              height="30px"
              alt="Neatflix logo"
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer" }}
            />
          </Box>
          {location.pathname !== "/login" && (
            <Box>
              {session === "authorized" ? (
                <Box>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => setDrawerOpen(true)}
                    sx={{
                      mr: 2,
                      display: {
                        xs: "block",
                        sm: "none",
                      },
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                  }}
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
              )}
            </Box>
          )}
        </Box>
      ) : (
        <Box
          className={styles.headerContainerStyle}
          sx={{ maxWidth: location.pathname === "/" ? "66%" : "100%" }}
        >
          <Box className={styles.headerLogoAndButtons}>
            <CardMedia
              component="img"
              src="./neatflix-logo.png"
              height="40px"
              alt="Neatflix logo"
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer" }}
            />
            {session === "authorized" && (
              <Box sx={{ display: "flex" }}>
                <Button
                  color="pale"
                  sx={{
                    textTransform: "none",
                    mr: 2,
                  }}
                  onClick={() => navigate("/mylist")}
                >
                  My List
                </Button>
                <Button
                  color="pale"
                  sx={{
                    textTransform: "none",
                    mr: 2,
                  }}
                  onClick={() => navigate("/browse")}
                >
                  Browse
                </Button>
              </Box>
            )}
          </Box>
          <Box className={styles.headerButtons}>
            {location.pathname !== "/login" && (
              <Box>
                {session === "authorized" ? (
                  <Box>
                    <Button
                      color="pale"
                      sx={{
                        textTransform: "none",
                        mr: 2,
                      }}
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        textTransform: "none",
                      }}
                      onClick={() => handleLogout()}
                    >
                      Log Out
                    </Button>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                    }}
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Box>
      )}
      <MenuDrawer
        drawerOpen={drawerOpen}
        setOpenDrawer={setDrawerOpen}
        handleLogout={handleLogout}
      />
    </>
  );
};
