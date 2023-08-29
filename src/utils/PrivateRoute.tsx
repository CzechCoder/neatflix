import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";
import userStore from "../store/user-store";

export const PrivateRoute: FC = () => {
  const session = userStore.getState().session;
  return session === "authorized" ? <Outlet /> : <Navigate to="/login" />;
};
