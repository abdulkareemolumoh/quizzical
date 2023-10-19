import React from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import AnyCategoryQuiz from "./pages/AnyCategoryQuiz";
import { anyCategoryQuizLoader } from "../src/getQuizData";
import { ThemeProvider } from "./components/ThemeContext";
import { Quiz } from "./pages/Quiz";
import ErrorElement from "./pages/Error";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="quiz" element={<Quiz />}>
          <Route
            index
            element={<AnyCategoryQuiz />}
            loader={anyCategoryQuizLoader}
          />
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
