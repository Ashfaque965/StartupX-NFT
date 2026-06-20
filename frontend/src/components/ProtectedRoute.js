import React, { useEffect } from "react";
import { useAuthStore } from "../store";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !user) {
      navigate("/");
    }
  }, [token, user, navigate]);

  if (!token || !user) {
    return null;
  }

  return children;
}
