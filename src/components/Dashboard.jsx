import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Cookies from "js-cookie";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Dashboard = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosPrivate.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          withCredentials: true,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
