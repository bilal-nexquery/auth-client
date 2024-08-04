import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const RequireAuth = () => {
  const location = useLocation();
  if (Cookies.get("oAuth")) {
    window.localStorage.setItem("isLoggedIn", true);
    Cookies.remove("oAuth");
  }
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  return isLoggedIn === "true" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
