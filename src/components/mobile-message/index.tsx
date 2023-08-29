import { Dispatch, FC, SetStateAction } from "react";
import { Box, Button, Typography } from "@mui/material";
import styles from "./index.module.css";

interface MobileMessageProps {
  setMobileMessageOpen: Dispatch<SetStateAction<boolean>>;
}

export const MobileMessage: FC<MobileMessageProps> = ({
  setMobileMessageOpen,
}) => (
  <Box className={styles.messageContainer}>
    <Typography variant="body1" style={{ fontWeight: 600 }}>
      Viewing on mobile?
    </Typography>
    <Typography variant="body1" component="p">
      Download our free app on your app store for a optimized experience!
    </Typography>
    <Button
      variant="contained"
      sx={{
        textTransform: "none",
        marginTop: "15px",
      }}
      onClick={() => setMobileMessageOpen(false)}
    >
      Okay!
    </Button>
  </Box>
);
