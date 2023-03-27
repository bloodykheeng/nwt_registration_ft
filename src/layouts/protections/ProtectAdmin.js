import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuthContext from "context/AuthContext";

function ProtectAdmin() {
  const { user } = useAuthContext();
  console.log("user protect guest is : ", user);
  return user ? <Outlet /> : <Navigate replace to="/auth/index" />;
}

export default ProtectAdmin;
