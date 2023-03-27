import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuthContext from "context/AuthContext";

function ProtectGuest() {
  const { user } = useAuthContext();

  console.log("user protect guest is : ", user);
  return !user ? <Outlet /> : <Navigate replace to="/admin/dashboard" />;
}

export default ProtectGuest;
