import axios from "../api/axios";
import Cookies from "js-cookie";
import useAuth from "./useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const refresh = async () => {
    const response = await axios
      .post(
        "/auth/refresh/",
        {
          refresh: Cookies.get("refreshToken"),
        },
        {
          headers: { "Content-type": "application/json" },
        }
      )
      .catch((err) => {
        if (err) {
          window.localStorage.setItem("isLoggedIn", "false");
          console.log(window.localStorage.getItem("isLoggedIn"));
          navigate("/login", { state: { from: location }, replace: true });
        }
      });
    Cookies.set("accessToken", response?.data?.access);
    Cookies.set("refreshToken", response?.data?.refresh);
    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response?.data?.access,
        refreshToken: response?.data?.refresh,
      };
    });
    return response.data.access;
  };

  return refresh;
};

export default useRefreshToken;
