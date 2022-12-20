import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthRole from "../../hooks/useAuth/AuthRole";
import useAuth from "../../hooks/useAuth/useAuth";

interface IProps {
  roles: AuthRole[];
}

const RequireRole = ({ roles }: IProps) => {
  const { credentials } = useAuth();
  const location = useLocation();

  return roles.includes(credentials.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireRole;
