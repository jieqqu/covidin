import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("cinguan_token"));
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
