import { useLocation, Navigate, Outlet } from "react-router-dom";
const RequireAuth = () => {
  const location = useLocation();
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  return isLoggedIn === "true" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
