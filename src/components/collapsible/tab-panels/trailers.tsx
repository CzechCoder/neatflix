import { FC, useRef } from "react";
import {
  Box,
  CardMedia,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { CustomTabPanel } from "../../custom-tab-panel";
import { PlayArrowIconStyled } from "../../play-arrow-icon-styled";
import { Trailer } from "../../../data/trailers-data";
import styles from "./trailers.module.css";
import { Draggable } from "../../draggable";

interface TrailersTabProps {
  tabValue: number;
  title: string;
  playVideo: (name: string, url: string) => void;
  trailers_data: Trailer[];
}

export const TrailersTab: FC<TrailersTabProps> = ({
  tabValue,
  title,
  playVideo,
  trailers_data,
}) => {
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const rowRef = useRef(null);

  return (
    <CustomTabPanel value={tabValue} index={1}>
      <Box className={styles.trailersContainer}>
        <Typography
          variant={mobile ? "h1_title" : "h3"}
          component="h3"
          paragraph
          sx={{ color: "white", p: 3 }}
        >
          {title}
        </Typography>
        <Draggable rootClass={"drag"}>
          <Box ref={rowRef} className={styles.trailersWrapper}>
            {trailers_data.map((trailer) => (
              <Box className={styles.trailerWrapper} key={trailer.name}>
                <Box className={styles.trailerSecondWrapper}>
                  <Box className={styles.playArrowIconWrapper}>
                    <PlayArrowIconStyled
                      playVideo={playVideo}
                      video={trailer}
                    />
                  </Box>
                  <CardMedia
                    component="img"
                    src={trailer.image}
                    alt={trailer.name}
                    sx={{
                      objectFit: "contain",
                      width: "100%",
                      maxHeight: "200px",
                      cursor: "pointer",
                      marginBottom: "10px",
                    }}
                  />
                </Box>
                <Typography variant="body_detail" sx={{ width: "300px" }}>
                  {trailer.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Draggable>
      </Box>
    </CustomTabPanel>
  );
};
