import { Dispatch, FC, FormEvent, SetStateAction } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Dialog } from "@mui/material";
import styles from "./index.module.css";

interface ResetPasswordDialogProps {
  handleClose: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  handleReset: (e: FormEvent<HTMLFormElement>) => void;
}

export const ResetPasswordDialog: FC<ResetPasswordDialogProps> = ({
  handleClose,
  open,
  handleReset,
}) => {
  return (
    <Dialog onClose={() => handleClose(false)} open={open}>
      <Box className={styles.dialogContainer}>
        <Box className={styles.dialogWrapper}>
          <Typography variant="h1_title" sx={{ fontWeight: "bold" }}>
            Forgot Password
          </Typography>
          <Typography variant="body1" component="p" sx={{ my: 2 }}>
            We will send you an email with instructions on how to reset your
            password.
          </Typography>
          <Box
            component="form"
            onSubmit={handleReset}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              type="email"
              label="Email Address"
              autoFocus
              variant="filled"
              className="form-textfield"
              color="secondary"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Email Me
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};
