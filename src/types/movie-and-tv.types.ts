export interface MovieData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TVData {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface CreditsData {
  id: number;
  cast: any[];
  crew: any[];
}

export interface Video {
  name: string;
  url: string;
}

export interface Language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDataQuery {
  page: number;
  results: MovieData[];
  total_pages: number;
  total_results: number;
}
