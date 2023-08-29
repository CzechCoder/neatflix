import { FC } from "react";
import requests from "../../utils/requests";
import { Row } from "../../components/row";
import { RandomMovie } from "../../components/random-movie";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Footer } from "../../components/footer";
import { MovieDataQuery } from "../../types/movie-and-tv.types";
import { useQuery } from "react-query";
import axios from "axios";
import { useSnackbar } from "notistack";

export const BrowseMovies: FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const getMovies = async () => {
    const response = await axios.get<MovieDataQuery>(requests.requestPopular);
    return response.data;
  };

  const { data: movies } = useQuery("get popular movies", getMovies, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    onError: (e) => {
      enqueueSnackbar("Error downloading popular movies", { variant: "error" });
    },
  });

  return (
    <>
      {!movies ? (
        <Box className="loader-container">
          <CircularProgress />
        </Box>
      ) : (
        <RandomMovie movies={movies.results} />
      )}
      <Row
        isPosterRow
        title="Neatflix Originals"
        fetchUrl={requests.requestNetflixOriginals}
      />
      <Row title="Trending Now" fetchUrl={requests.requestTrending} />
      <Row title="Upcoming" fetchUrl={requests.requestUpcoming} />
      <Row title="Popular" fetchUrl={requests.requestPopular} />
      <Row title="Top Rated" fetchUrl={requests.requestTopRated} />
      <Row title="Comedy" fetchUrl={requests.requestComedy} />
      <Footer width="full" />
    </>
  );
};
