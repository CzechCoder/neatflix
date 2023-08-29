import { FC } from "react";
import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import { CustomTabPanel } from "../../custom-tab-panel";
import {
  CreditsData,
  Genre,
  Language,
} from "../../../types/movie-and-tv.types";
import styles from "./details.module.css";

interface DetailsTabProps {
  tabValue: number;
  title: string;
  credits?: CreditsData;
  genres: Genre[];
  spoken_languages: Language[];
}

export const DetailsTab: FC<DetailsTabProps> = ({
  tabValue,
  title,
  credits,
  genres,
  spoken_languages,
}) => {
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  return (
    <CustomTabPanel value={tabValue} index={2} sx={{ p: 3 }}>
      {credits ? (
        <Box
          className={styles.detailsContainer}
          sx={{ width: { sm: "60%", xs: "100%" } }}
        >
          <Typography
            variant={mobile ? "h1_title" : "h3"}
            component="h3"
            paragraph
            sx={{ color: "white" }}
          >
            {title}
          </Typography>
          <Box className={styles.detailsWrapper}>
            <Typography variant="body_detail">
              Cast:{" "}
              {credits.cast.length === 0
                ? "No cast data available."
                : credits.cast.slice(0, 4).map((actor: any, i: number) => [
                    <span key={i} style={{ color: "white" }}>
                      {i > 0 && ", "}
                      {actor.name}
                    </span>,
                  ])}
            </Typography>
            <Typography variant="body_detail">
              Genres:{" "}
              {genres.map((genre: Genre, i: number) => [
                <span key={genre.id} style={{ color: "white" }}>
                  {i > 0 && ", "}
                  {genre.name}
                </span>,
              ])}
            </Typography>
            <Typography variant="body_detail">
              Spoken languages:{" "}
              {spoken_languages.map((language: Language, i: number) => [
                <span key={language.iso_639_1} style={{ color: "white" }}>
                  {i > 0 && ", "}
                  {language.english_name}
                </span>,
              ])}
            </Typography>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </CustomTabPanel>
  );
};
