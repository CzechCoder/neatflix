import { FC } from "react";
import { Box } from "@mui/material";
import { Row } from "../../components/row";

export const MyListPage: FC = () => {
  return (
    <Box sx={{ mt: "120px" }}>
      <Row title="My List" isMyList />
    </Box>
  );
};
