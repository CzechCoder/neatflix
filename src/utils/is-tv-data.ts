import { MovieData, TVData } from "../types/movie-and-tv.types";

export type MovieOrTV = MovieData | TVData;

export const isTVData = (data: MovieOrTV): data is TVData => {
  return (data as TVData).name !== undefined;
};
