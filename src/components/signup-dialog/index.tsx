import { Dispatch, FC, SetStateAction } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Dialog } from "@mui/material";
import { useNavigate } from "react-router-dom";
import userStore from "../../store/user-store";
import styles from "./index.module.css";

interface SignupDialogProps {
  handleClose: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

export const SignupDialog: FC<SignupDialogProps> = ({ handleClose, open }) => {
  const navigate = useNavigate();
  const [session] = userStore((state) => [state.session]);
  const authorized = session === "authorized";
  return (
    <Dialog onClose={() => handleClose(false)} open={open}>
      <Box className={styles.dialogContainer}>
        <Box className={styles.dialogWrapper}>
          <Typography variant="h1_title" sx={{ fontWeight: "bold" }}>
            {authorized ? "Already registered!" : "Sign up successful!"}
          </Typography>
          <Typography variant="body1" component="p" sx={{ my: 2 }}>
            {authorized
              ? "It appears you are already registered and signed in. If you want to make another account, please log out first."
              : "You have successfully signed up! However, for the demo purposes please use a log in information you'll find on the next page."}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
            onClick={() =>
              authorized ? handleClose(false) : navigate("/login")
            }
          >
            Okay
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
