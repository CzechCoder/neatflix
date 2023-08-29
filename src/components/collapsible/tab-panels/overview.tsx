import { FC } from "react";
import {
  Box,
  Button,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { CustomTabPanel } from "../../custom-tab-panel";
import { PlayArrowIconStyled } from "../../play-arrow-icon-styled";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DoneIcon from "@mui/icons-material/Done";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { toggleThumbsUpOrDown } from "../../../utils/thumbs-up-or-down";
import userStore from "../../../store/user-store";
import { shallow } from "zustand/shallow";
import styles from "./overview.module.css";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";

interface OverviewTabProps {
  tabValue: number;
  title: string;
  isTVData: boolean;
  playVideo: (name: string, url: string) => void;
  openedMovieDetail: any;
}

export const OverviewTab: FC<OverviewTabProps> = ({
  tabValue,
  title,
  isTVData,
  playVideo,
  openedMovieDetail,
}) => {
  const [user, toggleFavoriteMovie] = userStore(
    (state) => [state.user, state.toggleFavoriteMovie],
    shallow
  );

  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();

  const {
    backdrop_path,
    first_air_date,
    id,
    number_of_seasons,
    overview,
    release_date,
    runtime,
  } = openedMovieDetail;

  const favoriteMovie: boolean = !!user?.favoriteMovies.find((movie) => {
    return movie.id === id && movie.isTVData === isTVData;
  });

  const handleToggleFavoriteMovie = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    toggleFavoriteMovie(id, title, isTVData, backdrop_path);
    enqueueSnackbar(
      `${title} ${favoriteMovie ? "removed from" : "added to"} My List`,
      { variant: favoriteMovie ? "error" : "success" }
    );
  };

  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <CustomTabPanel
      value={tabValue}
      index={0}
      sx={{ display: "flex", height: "100%", padding: mobile ? 0 : 3 }}
    >
      <Box
        sx={{
          color: { sm: theme.palette.gray.main, xs: "white" },
          width: { sm: "50%", xs: "100%" },
          display: { sm: "block", xs: "flex" },
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "500px",
          padding: mobile ? 3 : 0,
          boxSizing: "border-box",
        }}
      >
        <Box>
          <Typography
            variant={mobile ? "h1_title" : "h3"}
            component="h3"
            paragraph
            sx={{ color: "white" }}
          >
            {title}
          </Typography>
          {!isTVData && (
            <Typography variant="body_detail" paragraph>
              {release_date?.slice(0, 4)} {runtime} min
            </Typography>
          )}
          {isTVData && (
            <Typography variant="body_detail" paragraph>
              {first_air_date?.slice(0, 4)} {number_of_seasons}{" "}
              {number_of_seasons > 1 ? "Seasons" : "Season"}
            </Typography>
          )}
          <Typography variant={mobile ? "body1" : "body_detail"} paragraph>
            {overview}
          </Typography>
        </Box>
        <Box className={styles.overviewTextWrapper}>
          {mobile && (
            <Button
              fullWidth
              variant="contained"
              onClick={() =>
                playVideo(title, isTVData ? "s01e01.mp4" : "main_movie.mp4")
              }
            >
              Play
            </Button>
          )}
          <Box className={styles.myListWrapper}>
            <IconButton
              aria-label="add or remove"
              onClick={(e) => handleToggleFavoriteMovie(e)}
              sx={{ color: "white" }}
            >
              {favoriteMovie ? (
                <DoneIcon
                  fontSize="medium"
                  sx={{
                    p: 1,
                    border: "2px solid gray",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <AddOutlinedIcon
                  fontSize="medium"
                  sx={{
                    p: 1,
                    border: "2px solid gray",
                    borderRadius: "50%",
                  }}
                />
              )}
            </IconButton>
            {!mobile && "MY LIST"}
          </Box>
          <IconButton
            aria-label="thumb up"
            onClick={() => toggleThumbsUpOrDown(id, "thumbUp")}
            sx={{ color: "white", marginLeft: { sm: "16px", xs: "0" } }}
          >
            {user?.thumbsUpMovies.includes(id) ? (
              <ThumbUpIcon
                fontSize="medium"
                sx={{
                  p: 1,
                  border: "2px solid gray",
                  borderRadius: "50%",
                  color: "white",
                }}
              />
            ) : (
              <ThumbUpOutlinedIcon
                fontSize="medium"
                sx={{
                  p: 1,
                  border: "2px solid gray",
                  borderRadius: "50%",
                  color: "white",
                }}
              />
            )}
          </IconButton>{" "}
          <IconButton
            aria-label="thumb down"
            onClick={() => toggleThumbsUpOrDown(id, "thumbDown")}
            sx={{ color: "white" }}
          >
            {user?.thumbsDownMovies.includes(id) ? (
              <ThumbDownIcon
                fontSize="medium"
                sx={{
                  p: 1,
                  border: "2px solid gray",
                  borderRadius: "50%",
                  color: "white",
                }}
              />
            ) : (
              <ThumbDownOutlinedIcon
                fontSize="medium"
                sx={{
                  p: 1,
                  border: "2px solid gray",
                  borderRadius: "50%",
                  color: "white",
                }}
              />
            )}
          </IconButton>
        </Box>
      </Box>
      <Box
        className={styles.playArrowIconWrapper}
        sx={{ display: { sm: "flex", xs: "none" } }}
      >
        <PlayArrowIconStyled
          playVideo={playVideo}
          video={{
            name: title,
            url: isTVData ? "s01e01.mp4" : "main_movie.mp4",
          }}
          large
        />
      </Box>
    </CustomTabPanel>
  );
};
