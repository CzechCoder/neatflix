import { FC, FormEvent } from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import styles from "./index.module.css";
import { SignupForm } from "../signup-form";

interface HomeHeroProps {
  handleSignUp: (e: FormEvent<HTMLFormElement>) => void;
}

export const HomeHero: FC<HomeHeroProps> = ({ handleSignUp }) => {
  return (
    <Box>
      <Box className={styles.heroContainer}>
        <Box className={styles.heroBgContainer}>
          <Box className={styles.heroBgContainer2}>
            <CardMedia
              component="img"
              src="./home-bg.jpg"
              alt="home background"
              sx={{ objectFit: "cover", height: "100%" }}
            />
            <Box className={styles.heroBgGradient}></Box>
          </Box>
        </Box>
        <Box className={styles.heroTextContainer}>
          <Box className={styles.heroTextWrapper}>
            <Typography sx={{ typography: { sm: "h1_lg", xs: "h1_sm" } }}>
              Unlimited movies, TV shows, and more
            </Typography>
            <Typography sx={{ typography: { sm: "h5", xs: "h5_sm" } }}>
              Watch anywhere. Cancel anytime.
            </Typography>
            <SignupForm handleSignUp={handleSignUp} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
