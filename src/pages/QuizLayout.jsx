import React from "react";
import { Outlet } from "react-router-dom";

export default function QuizLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
