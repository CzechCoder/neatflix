import { FC, useMemo, useState } from "react";
import { Box, Button, CardMedia, Modal, Typography } from "@mui/material";
import userStore from "../../store/user-store";
import { shallow } from "zustand/shallow";
import { VideoModal } from "../video-modal";
import { MovieData } from "../../types/movie-and-tv.types";
import { useSnackbar } from "notistack";
import styles from "./index.module.css";
import { truncateString } from "../../utils/truncate-string";

interface RandomMovieProps {
  movies: MovieData[];
}

export const RandomMovie: FC<RandomMovieProps> = ({ movies }) => {
  const [toggleFavoriteMovie, user] = userStore(
    (state) => [state.toggleFavoriteMovie, state.user],
    shallow
  );
  const [openMovieModal, setOpenMovieModal] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const getRandomNumber = useMemo(() => Math.floor(Math.random() * 20), []);

  const randomMovie = movies[getRandomNumber];

  const favoriteMovie = !!user?.favoriteMovies.find((movie) => {
    return movie.id === randomMovie?.id && movie.isTVData === false;
  });

  const handleOpen = () => setOpenMovieModal(true);
  const handleClose = () => setOpenMovieModal(false);

  const handleToggleFavoriteMovie = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    toggleFavoriteMovie(
      randomMovie?.id,
      randomMovie?.title,
      false,
      randomMovie?.backdrop_path
    );
    enqueueSnackbar(
      `${randomMovie?.title} ${
        favoriteMovie ? "removed from" : "added to"
      } My List`,
      { variant: favoriteMovie ? "error" : "success" }
    );
  };

  return (
    <Box className={styles.randomMovieContainer}>
      <Box className={styles.gradientOverlay}></Box>
      <CardMedia
        component="img"
        src={`https://image.tmdb.org/t/p/original/${randomMovie?.backdrop_path}`}
        alt={randomMovie?.title}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <Box className={styles.textWrapper}>
        <Typography variant="h3">
          {randomMovie?.title || randomMovie?.original_title}
        </Typography>
        <Box sx={{ my: 2, display: "flex", gap: "15px" }}>
          <Button variant="contained" color="pale" onClick={() => handleOpen()}>
            Play
          </Button>
          <Button
            variant="outlined"
            color="pale"
            onClick={(e) => handleToggleFavoriteMovie(e)}
          >
            {favoriteMovie ? "In Your List" : "Watch Later"}
          </Button>
        </Box>
        <Typography component="p" color="gray.light">
          Released: {randomMovie?.release_date}
        </Typography>
        <Typography
          component="p"
          sx={{ maxWidth: { sm: "40%", xs: "100%" }, mt: 1 }}
        >
          {truncateString(randomMovie?.overview, 180)}
        </Typography>
      </Box>
      <Modal
        open={openMovieModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEnforceFocus
      >
        <>
          <VideoModal
            title={randomMovie?.title || ""}
            video="main_movie.mp4"
            handleClose={handleClose}
          />
        </>
      </Modal>
    </Box>
  );
};
