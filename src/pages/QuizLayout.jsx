import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

export default function QuizLayout() {
  const { loggedIn } = useAuth();
  return loggedIn ? <Outlet /> : <Navigate to="login" />;
}
