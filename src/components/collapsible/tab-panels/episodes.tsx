import { Dispatch, FC, useCallback, useRef } from "react";
import {
  Box,
  CardMedia,
  MenuItem,
  Select,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { CustomTabPanel } from "../../custom-tab-panel";
import { Episode } from "../../../data/season-data";
import { PlayArrowIconStyled } from "../../play-arrow-icon-styled";
import styles from "./episodes.module.css";
import { Draggable } from "../../draggable";

interface EpisodeTabProps {
  tabValue: number;
  title: string;
  selectedSeason: string;
  seasonData: Episode[];
  number_of_seasons: number;
  setSelectedSeason: Dispatch<string>;
  playVideo: (name: string, url: string) => void;
}

export const EpisodesTab: FC<EpisodeTabProps> = ({
  tabValue,
  title,
  number_of_seasons,
  seasonData,
  selectedSeason,
  setSelectedSeason,
  playVideo,
}) => {
  const rowRef = useRef(null);

  const seasonSelectList: () => JSX.Element[] = useCallback(() => {
    let menuItems = [];
    for (let i = 0; i < number_of_seasons; i++) {
      menuItems.push(
        <MenuItem value={`season${i + 1}`} key={i}>{`Season ${
          i + 1
        }`}</MenuItem>
      );
    }
    return menuItems;
  }, [number_of_seasons]);

  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <CustomTabPanel value={tabValue} index={1}>
      <Box className={styles.episodesContainer}>
        <Box sx={{ p: 3 }}>
          <Typography
            variant={mobile ? "h1_title" : "h3"}
            component="h3"
            paragraph
            sx={{ color: "white" }}
          >
            {title}
          </Typography>
          <Select
            labelId="season-select"
            id="season-select"
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value as string)}
            sx={{
              maxWidth: "150px",
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
            {seasonSelectList()}
          </Select>
        </Box>
        <Draggable rootClass={"drag"}>
          <Box ref={rowRef} className={styles.episodesWrapper}>
            {seasonData.map((episode, i) => (
              <Box className={styles.episodeContainer} key={episode.name}>
                <Box className={styles.episodeWrapper}>
                  <Typography
                    variant="big_thin"
                    sx={{
                      position: "absolute",
                      left: 5,
                      bottom: 5,
                    }}
                  >
                    {i + 1}
                  </Typography>
                  <Box className={styles.playArrowIconWrapper}>
                    <PlayArrowIconStyled
                      playVideo={playVideo}
                      video={episode}
                    />
                  </Box>
                  <CardMedia
                    component="img"
                    src={episode.image}
                    alt={episode.name}
                    sx={{
                      objectFit: "contain",
                      width: "100%",
                      maxHeight: "200px",
                      cursor: "pointer",
                    }}
                  />
                </Box>
                <Box className={styles.episodeNameWrapper}>
                  <span>{episode.name}</span> <span>{episode.runtime}m</span>
                </Box>
                {!mobile && <Typography>{episode.description}</Typography>}
              </Box>
            ))}
          </Box>
        </Draggable>
      </Box>
    </CustomTabPanel>
  );
};
