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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="quiz" element={<Quiz />}>
          <Route
            path="anyCategoryQuiz"
            element={<AnyCategoryQuiz />}
            loader={anyCategoryQuizLoader}
            errorElement={<h1>Easy to deal with an error here</h1>}
          />
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
