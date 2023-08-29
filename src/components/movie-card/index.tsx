import { FC } from "react";
import { CardMedia } from "@mui/material";
import { isTVData } from "../../utils/is-tv-data";
import styles from "./index.module.css";

interface MovieCardProps {
  movie: any;
  isPosterRow?: boolean;
  isMyList?: boolean;
  handleOpenDetail: (movie: any, isTVData: boolean) => void;
}

export const MovieCard: FC<MovieCardProps> = ({
  movie,
  isPosterRow,
  isMyList,
  handleOpenDetail,
}) => {
  const isTVDataVariable: boolean = isMyList ? movie.isTVData : isTVData(movie);
  return (
    <CardMedia
      component="img"
      src={`https://image.tmdb.org/t/p/w500/${
        isPosterRow ? movie.poster_path : movie.backdrop_path
      }`}
      alt={isTVData(movie) ? movie.name : movie.title}
      onClick={() => handleOpenDetail(movie, isTVDataVariable)}
      className={styles.movieCard}
      sx={{
        "&:hover": {
          WebkitTransform: { sm: "scale(1.1)", xs: "scale(1)" },
          transform: { sm: "scale(1.1)", xs: "scale(1)" },
          zIndex: 10,
        },
      }}
    />
  );
};
