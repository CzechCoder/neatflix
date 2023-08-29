import { Dispatch } from "react";
import requests from "./requests";
import axios from "axios";
import { MovieData } from "../types/movie-and-tv.types";

interface OpenedMovieDetailObject extends MovieData {
  isTVData: boolean;
}

export const findMovie = async (
  id: number,
  isTVData: boolean,
  setOpenedMovieDetail: Dispatch<OpenedMovieDetailObject>
) => {
  const apiCall = `${requests.requestSpecificMovie.url}/${
    isTVData ? "tv" : "movie"
  }/${id}?api_key=${requests.requestSpecificMovie.key}`;
  const movieDetail = await axios.get<MovieData>(apiCall);
  setOpenedMovieDetail({ ...movieDetail.data, isTVData });
};
