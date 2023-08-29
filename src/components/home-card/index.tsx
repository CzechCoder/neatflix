import { FC } from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import styles from "./index.module.css";

export interface HomeCardProps {
  title: string;
  subtitle: string;
  image: string;
  reverse?: boolean;
}

export const HomeCard: FC<HomeCardProps> = ({
  title,
  subtitle,
  image,
  reverse,
}) => (
  <Box sx={{ minHeight: "auto", padding: "4.5rem 0", position: "relative" }}>
    <div className="home-divider" />
    <Box
      className={styles.homeCardWrapper}
      sx={{
        flexDirection: { sm: reverse ? "row-reverse" : "row", xs: "column" },
      }}
    >
      <Box sx={styles.boxStyle}>
        <Typography sx={{ typography: { sm: "h1_lg", xs: "h1_sm" } }}>
          {title}
        </Typography>
        <Typography
          sx={{ margin: "1rem 0 0", typography: { sm: "h5", xs: "h5_sm" } }}
        >
          {subtitle}
        </Typography>
      </Box>
      <Box sx={styles.boxStyle}>
        <CardMedia
          component="img"
          src={`./${image}`}
          alt="picture"
          sx={{ maxWidth: "600px" }}
        />
      </Box>
    </Box>
  </Box>
);
