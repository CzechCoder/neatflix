import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import { Theme, useMediaQuery } from "@mui/material";
import { MobileMessage } from "../components/mobile-message";

export const RootLayout: FC = () => {
  const [mobileMessageOpen, setMobileMessageOpen] = useState<boolean>(true);
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <>
      <Header />
      <Outlet />
      {mobile && mobileMessageOpen && (
        <MobileMessage setMobileMessageOpen={setMobileMessageOpen} />
      )}
    </>
  );
};
