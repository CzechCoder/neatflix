import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    h1_lg: React.CSSProperties;
    h1_sm: React.CSSProperties;
    h1_title: React.CSSProperties;
    h5_sm: React.CSSProperties;
    text_sm: React.CSSProperties;
    body_detail: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    h1_lg?: React.CSSProperties;
    h1_sm?: React.CSSProperties;
    h1_title?: React.CSSProperties;
    h5_sm?: React.CSSProperties;
    big_thin?: React.CSSProperties;
    text_sm?: React.CSSProperties;
    body_detail?: React.CSSProperties;
  }
}

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    gray: PaletteColor;
    pale: PaletteColor;
  }
  interface PaletteOptions {
    gray: PaletteColorOptions;
    pale: PaletteColorOptions;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h1_lg: true;
    h1_sm: true;
    h1_title: true;
    h5_sm: true;
    big_thin: true;
    text_sm: true;
    body_detail: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    pale: true;
  }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });

export const neatflixTheme = createTheme({
  typography: {
    h1_lg: {
      fontSize: "3rem",
      fontWeight: "900",
    },
    h1_sm: {
      fontSize: "2rem",
      fontWeight: "600",
    },
    h1_title: {
      fontSize: "1.8rem",
      lineHeight: "2.2rem",
    },
    h5_sm: { fontSize: "1.125rem", fontWeight: "400" },
    big_thin: {
      fontSize: "2.3rem",
    },
    text_sm: {
      fontSize: "0.875rem",
      lineHeight: "1.25rem",
    },
    body_detail: {
      fontSize: "1.25rem",
      lineHeight: "2rem",
    },
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#e50914",
    },
    secondary: {
      main: "#0080ff",
    },
    gray: {
      main: "#808080",
      light: "#d3d3d3",
    },
    pale: createColor("#FFF"),
  },
});
