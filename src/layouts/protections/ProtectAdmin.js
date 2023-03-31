import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuthContext from "context/AuthContext";

function ProtectAdmin() {
  const { user, getUser } = useAuthContext();
  const [userData, setUserData] = useState();
  const getUserInfo = async () => {
    const data = await getUser();
    setUserData(data);
  };
  // useEffect(() => {
  //   getUserInfo();
  // }, []);
  console.log("user protect guest is : ", user);
  return user && <Outlet />;
}

export default ProtectAdmin;
