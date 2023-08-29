import { FC, useRef, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import moviesStore from "../../store/movies.store";
import { Draggable } from "../draggable";
import { shallow } from "zustand/shallow";
import { emptyMovieDetail } from "../../data/empty-movie-detail";
import { MovieCard } from "../movie-card";
import { Collapsible } from "../collapsible";
import { findMovie } from "../../utils/find-movie";
import userStore from "../../store/user-store";
import styles from "./index.module.css";
import { useQuery } from "react-query";
import { MovieDataQuery } from "../../types/movie-and-tv.types";
import axios from "axios";
import { useSnackbar } from "notistack";

interface RowProps {
  title: string;
  fetchUrl?: string;
  isPosterRow?: boolean;
  isMyList?: boolean;
}

export const Row: FC<RowProps> = ({
  title,
  fetchUrl,
  isPosterRow,
  isMyList,
}) => {
  const [openedRow, setOpenedRow] = moviesStore(
    (state) => [state.openedRow, state.setOpenedRow],
    shallow
  );
  const [favoriteMovies] = userStore(
    (state) => [state.user.favoriteMovies],
    shallow
  );
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [openedMovieDetail, setOpenedMovieDetail] =
    useState<any>(emptyMovieDetail);
  const { enqueueSnackbar } = useSnackbar();
  const rowRef = useRef(null);

  const isThisRowOpen: boolean = openedRow === title;

  const handleOpenDetail = (movie: any, isTVData: boolean) => {
    if (openDetail) {
      if (movie.id === openedMovieDetail.id) {
        setOpenDetail(false);
        return;
      }
      findMovie(movie.id, isTVData, setOpenedMovieDetail);
      setOpenedRow(title);
      return;
    }
    setOpenDetail(true);
    findMovie(movie.id, isTVData, setOpenedMovieDetail);
    setOpenedRow(title);
  };

  const getMovies = async () => {
    if (fetchUrl) {
      const response = await axios.get<MovieDataQuery>(fetchUrl);
      return response.data;
    } else return;
  };

  const { data: movies } = useQuery(
    `Download movies for row ${title}`,
    getMovies,
    {
      onError: (e) => {
        enqueueSnackbar(`Error downloading movies for row ${title}`, {
          variant: "error",
        });
      },
    }
  );

  return (
    <Box>
      <Typography
        variant="h6"
        component="h6"
        sx={{ ml: 4, fontWeight: "bold" }}
      >
        {title}
      </Typography>
      <Draggable rootClass={"drag"}>
        <Box
          ref={rowRef}
          className={styles.rowWrapper}
          sx={{
            height: isPosterRow ? "350px" : "150px",
          }}
        >
          {isMyList ? (
            favoriteMovies.length === 0 ? (
              <Box>It appears there are no items in your list.</Box>
            ) : (
              favoriteMovies.map((movie) => (
                <MovieCard
                  movie={movie}
                  isMyList
                  handleOpenDetail={handleOpenDetail}
                  key={movie.id}
                />
              ))
            )
          ) : movies ? (
            movies.results.map(
              (movie) =>
                ((isPosterRow && movie.poster_path) ||
                  (!isPosterRow && movie.backdrop_path)) && (
                  <MovieCard
                    movie={movie}
                    isPosterRow={isPosterRow}
                    handleOpenDetail={handleOpenDetail}
                    key={movie.id}
                  />
                )
            )
          ) : (
            <Box className="loader-container">
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Draggable>
      <Collapsible
        openDetail={openDetail}
        openedMovieDetail={openedMovieDetail}
        isThisRowOpen={isThisRowOpen}
        isMyList={isMyList || false}
      />
    </Box>
  );
};
