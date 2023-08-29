import { FC, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import styles from "./index.module.css";

interface VideoModalProps {
  handleClose: () => void;
  title: string;
  video: string;
}

export const VideoModal: FC<VideoModalProps> = ({
  handleClose,
  title,
  video,
}) => {
  const [videoLoading, setVideoLoading] = useState(true);
  const spinner = () => {
    setVideoLoading(!videoLoading);
  };
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  return (
    <Box
      className={styles.modalContainer}
      sx={{ width: { sm: "auto", xs: "100%" } }}
    >
      <Box className={styles.modalWrapper}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Now playing {title}
        </Typography>
        <CloseIcon
          onClick={() => handleClose()}
          style={{ cursor: "pointer", width: "1em" }}
        />
      </Box>
      <iframe
        style={{ border: 0 }}
        onLoad={spinner}
        loading="lazy"
        width={mobile ? "100%" : "800"}
        height="450"
        src={video}
        title="Playing the video now"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
        allowFullScreen
      ></iframe>
    </Box>
  );
};
