import {
  Box,
  Button,
  CardMedia,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import userStore from "../../store/user-store";
import { shallow } from "zustand/shallow";
import { useState } from "react";
import { ChangePlanDialog } from "../../components/change-plan-dialog";
import { useNavigate } from "react-router-dom";
import { DeleteProfileDialog } from "../../components/delete-profile-dialog";
import styles from "./index.module.css";

export const ProfilePage = () => {
  const [user, setUser, setSession, setLanguage, setSubscription] = userStore(
    (store) => [
      store.user,
      store.setUser,
      store.setSession,
      store.setLanguage,
      store.setSubscription,
    ],
    shallow
  );
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] =
    useState<boolean>(false);
  const [deleteProfileDialogOpen, setDeleteProfileDialogOpen] =
    useState<boolean>(false);
  const [languageTemp, setLanguageTemp] = useState<string>(user.language);
  const [subscriptionTemp, setSubscriptionTemp] = useState<string>(
    user.subscription
  );
  const navigate = useNavigate();

  const saveData = () => {
    setLanguage(languageTemp);
    setSubscription(subscriptionTemp);
  };

  const handleLogout = () => {
    setDeleteProfileDialogOpen(false);
    setUser(undefined);
    setSession("unauthorized");
    navigate("/");
  };

  return (
    <Box sx={{ mt: { sm: "120px", xs: "0" }, width: "100%" }}>
      <Box
        id="user-form"
        sx={{
          mx: "auto",
          maxWidth: "550px",
          textAlign: { sm: "start", xs: "center" },
          padding: { sm: 0, xs: "0 20px 10px" },
        }}
      >
        <Typography variant="h3">Edit Profile</Typography>
        <Grid
          container
          sx={{ borderTop: "1px solid gray", pt: "20px", mt: "10px" }}
        >
          <Grid item xs={12} sm={2} sx={{ width: "auto" }}>
            <CardMedia
              component="img"
              src={"./avatar.jpg"}
              alt="user avatar"
              sx={{
                objectFit: "contain",
                width: "100",
                maxHeight: "100px",
                borderRadius: "10px",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={10} sx={{ pl: { sm: "20px", xs: "0" } }}>
            <Box className={styles.userInfoContainer}>
              <Typography variant="body_detail">{user.name}</Typography>
              <Box className={styles.userInfoWrapper}>
                <Typography variant="body_detail">Language:</Typography>
                <Select
                  labelId="language-select"
                  id="language-select"
                  value={user.language}
                  onChange={(e) => setLanguageTemp(e.target.value as string)}
                  sx={{
                    maxWidth: { sm: "150px", xs: "100%" },
                    height: "2.5rem",
                    color: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "white",
                    },
                  }}
                >
                  <MenuItem value="English">English</MenuItem>
                </Select>
              </Box>
              <Box className={styles.subscriptionContainer}>
                <Typography variant="body_detail">
                  Subscription plan:
                </Typography>
                <Box
                  className={styles.subscriptionWrapper}
                  sx={{ flexDirection: { sm: "row", xs: "column" } }}
                >
                  <Typography variant="text_sm">{subscriptionTemp}</Typography>
                  <Button
                    variant="contained"
                    sx={{
                      ml: { sm: "25px", xs: "0" },
                      mt: { sm: "0", xs: "10px" },
                    }}
                    onClick={() => setSubscriptionDialogOpen(true)}
                  >
                    Change
                  </Button>
                </Box>
                <Typography variant="text_sm">
                  Renewal date: 04/03/2025
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={styles.buttonsWrapper}>
              <Button
                variant="contained"
                color="pale"
                size="large"
                onClick={() => saveData()}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="pale"
                size="large"
                onClick={() => navigate("/browse")}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="pale"
                size="large"
                onClick={() => setDeleteProfileDialogOpen(true)}
              >
                Delete Profile
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ChangePlanDialog
        open={subscriptionDialogOpen}
        handleClose={setSubscriptionDialogOpen}
        setSubscription={setSubscriptionTemp}
      />
      <DeleteProfileDialog
        open={deleteProfileDialogOpen}
        handleClose={setDeleteProfileDialogOpen}
        handleLogout={handleLogout}
      />
    </Box>
  );
};
