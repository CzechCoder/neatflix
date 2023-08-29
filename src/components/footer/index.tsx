import { FC } from "react";
import { Box, Typography } from "@mui/material";

interface FooterProps {
  width: "full" | "narrow";
}

export const Footer: FC<FooterProps> = ({ width }) => {
  return (
    <Box
      sx={{
        margin: "auto",
        textAlign: { sm: "left", xs: "center" },
        ...(width === "narrow"
          ? { maxWidth: "66%", padding: "24px 0" }
          : { maxWidth: "100%", padding: "24px 30px" }),
      }}
    >
      <Typography color="gray.main">
        Neatflix Czechia, Copyright 2023
      </Typography>
    </Box>
  );
};
