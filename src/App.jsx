import React from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import Quiz from "./pages/Quiz";
import { ThemeProvider } from "./components/ThemeContext";
import QuizLayout from "./pages/QuizLayout";
import ErrorElement from "./pages/Error";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="quiz" element={<QuizLayout />}>
          <Route index element={<Quiz />} />
          <Route path="*" element={<ErrorElement />} />
        </Route>
      </Route>
    )
  );

  return (
    <ThemeProvider>
      <div>
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
