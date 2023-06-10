import { Progress } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { history } from "../../helpers/history";
import { useGetMeQuery } from "../../redux/api/userApiSlice";

interface RequireAuthProps {
  children?: ReactElement;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  // globally store current location
  history.location = useLocation();

  const { isLoading, data: user } = useGetMeQuery();

  if (isLoading) return <Progress size="xs" isIndeterminate />;

  if (!user) return <Navigate to={"/login"} />;

  return children ? children : <Outlet />;
};
