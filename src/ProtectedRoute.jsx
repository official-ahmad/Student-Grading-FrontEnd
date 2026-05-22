import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      toast.error(
        "Unauthorized Access 🚫: Please log in as an Admin to access the dashboard",
        {
          position: "top-center",
          autoClose: 5000,
        },
      );
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
