import { FC, ReactNode } from "react";
import { Box } from "@mui/material";

interface TabPanelProps {
  sx?: {};
  children?: ReactNode;
  index: number;
  value: number;
}

export const CustomTabPanel: FC<TabPanelProps> = (props) => {
  const { children, value, index, sx, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      sx={{ height: "100%" }}
    >
      {value === index && <Box sx={{ ...sx }}>{children}</Box>}
    </Box>
  );
};
