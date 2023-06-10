import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

interface RequireAuthProps {
  children?: ReactElement;
}

function RequireAuth({ children }: RequireAuthProps) {
  return children ? children : <Outlet />;
}

export default RequireAuth;
