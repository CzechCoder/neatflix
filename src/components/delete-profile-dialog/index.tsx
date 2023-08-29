import { Dispatch, FC, SetStateAction } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

interface DeleteProfileDialogProps {
  handleClose: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  handleLogout: () => void;
}

export const DeleteProfileDialog: FC<DeleteProfileDialogProps> = ({
  handleClose,
  open,
  handleLogout,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete your user profile?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete your profile? This function cannot be
          undone.
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          For the testing purposes, the profile won't be deleted, but you will
          be logged out instead.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Keep my profile</Button>
        <Button variant="contained" onClick={() => handleLogout()} autoFocus>
          I am sure
        </Button>
      </DialogActions>
    </Dialog>
  );
};
