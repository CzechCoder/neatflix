import { FC, SyntheticEvent } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export interface AccordionProps {
  title: string;
  text: string;
}

interface HomeAccordionProps extends AccordionProps {
  expanded: string | false;
  handleChange: (
    panel: string
  ) => (e: SyntheticEvent, isExpanded: boolean) => void;
  number: number;
}

export const HomeAccordion: FC<HomeAccordionProps> = ({
  expanded,
  handleChange,
  title,
  text,
  number,
}) => (
  <Accordion
    expanded={expanded === `panel${number}`}
    onChange={handleChange(`panel${number}`)}
    sx={{ mb: "0.5rem", color: "white", background: "#2d2d2d" }}
    disableGutters
  >
    <AccordionSummary
      expandIcon={
        <AddIcon
          sx={{ color: "white", fontSize: { sm: "3rem", xs: "1.2rem" } }}
        />
      }
      sx={{
        borderBottom: "2px solid black",
        py: "10px",
        "& .MuiAccordionSummary-expandIconWrapper": {
          transition: "none",
          "&.Mui-expanded": {
            transform: "rotate(225deg)",
          },
        },
      }}
      aria-controls="panel-content"
      id="panel-header"
    >
      <Typography
        sx={{
          width: "90%",
          flexShrink: 0,
          typography: { sm: "h5", xs: "h5_sm" },
        }}
      >
        {title}
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography sx={{ typography: { sm: "h5", xs: "h5_sm" } }}>
        {text}
      </Typography>
    </AccordionDetails>
  </Accordion>
);
