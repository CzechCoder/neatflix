import {
  Box,
  Button,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResetPasswordDialog } from "../../components/reset-password-dialog";
import { authorize } from "../../utils/authorize";
import userStore from "../../store/user-store";
import { UserObject } from "../../data/user-object";
import styles from "./index.module.css";

export interface UserData {
  message: string;
  user?: UserObject;
}

export const LoginPage = () => {
  const [helpDialogOpen, setHelpDialogOpen] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [setUser] = userStore((store) => [store.setUser]);
  const [setSession] = userStore((store) => [store.setSession]);
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData: UserData = authorize(loginData);
    if (userData.message === "authorized") {
      setErrorMessage(null);
      setUser(userData.user);
      setSession("authorized");
      navigate("/browse");
    } else {
      setErrorMessage(userData.message);
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHelpDialogOpen(false);
  };

  return (
    <Box className={styles.loginContainer}>
      <CardMedia
        component="img"
        src="./home-bg.jpg"
        alt="home background"
        className={styles.loginBackground}
      />
      <Box
        className={styles.loginFormContainer}
        sx={{ pt: { sm: "150px", xs: 0 } }}
      >
        <Box className={styles.loginFormFrame}>
          <Box className={styles.loginFormWrapper}>
            <Typography variant="h1_title" sx={{ fontWeight: "bold" }}>
              Sign In
            </Typography>
            {errorMessage && (
              <Box className={styles.errorMessage}>{errorMessage}</Box>
            )}
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                sx={{
                  flex: "1 1 auto",
                  background: "#333",
                  input: { color: "white" },
                }}
                InputLabelProps={{ style: { color: "#8c8c8c" } }}
                margin="normal"
                required
                fullWidth
                label="Email Address"
                type="email"
                name="email"
                autoComplete="email"
                autoFocus
                variant="filled"
                className="form-textfield"
                onChange={onInputChange}
              />
              <TextField
                sx={{
                  flex: "1 1 auto",
                  background: "#333",
                  input: { color: "white" },
                }}
                InputLabelProps={{ style: { color: "#8c8c8c" } }}
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                name="password"
                variant="filled"
                className="form-textfield"
                onChange={onInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Grid container>
                  <Grid item xs>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="remember"
                          color="primary"
                          size="small"
                          sx={{
                            color: "white",
                            "&.Mui-checked": {
                              color: "red",
                            },
                          }}
                        />
                      }
                      label="Remember me"
                    />
                  </Grid>
                  <Grid item sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      onClick={() => setHelpDialogOpen(true)}
                      sx={{ cursor: "pointer" }}
                    >
                      Need help?
                    </Box>
                  </Grid>
                  <Grid item xs={12} className={styles.credentialsContainer}>
                    Please use the credentials below to log in.
                    <p>
                      Email:{" "}
                      <span style={{ color: "white" }}>john@gmail.com</span>
                    </p>
                    <p>
                      Password: <span style={{ color: "white" }}>1234</span>
                    </p>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <ResetPasswordDialog
        open={helpDialogOpen}
        handleClose={setHelpDialogOpen}
        handleReset={handleReset}
      />
    </Box>
  );
};
