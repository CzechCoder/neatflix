import { FC, FormEvent } from "react";
import {
  Box,
  Button,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./index.module.css";

interface SignupFormProps {
  handleSignUp: (e: FormEvent<HTMLFormElement>) => void;
}

export const SignupForm: FC<SignupFormProps> = ({ handleSignUp }) => {
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  return (
    <Box
      className={styles.signupFormContainer}
      component="form"
      onSubmit={handleSignUp}
    >
      <Typography sx={{ typography: { sm: "h5", xs: "h5_sm" } }}>
        Ready to watch? Enter your email to create or restart your membership.
      </Typography>
      <Box className={styles.signupFormTextWrapper}>
        <TextField
          required
          fullWidth
          label="Email Address"
          autoComplete="email"
          type="email"
          variant="filled"
          className={styles.emailInput}
          sx={{
            border: "1px solid gray",
            width: { sm: "auto", xs: "100%" },
            input: { color: "white" },
          }}
          InputLabelProps={{ style: { color: "#BAB9B9" } }}
        />
        <Button
          type="submit"
          variant="contained"
          size={mobile ? "small" : "large"}
          sx={{ flex: "0 0 auto", height: "56px" }}
        >
          <Typography variant="h5" className={styles.buttonText}>
            Get Started
          </Typography>
          <ArrowForwardIosIcon />
        </Button>
      </Box>
      Your email is not recorded, you will be provided credentials for a demo
      profile.
    </Box>
  );
};
