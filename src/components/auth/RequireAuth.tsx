import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

interface RequireAuthProps {
  children?: ReactElement;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  return children ? children : <Outlet />;
};
