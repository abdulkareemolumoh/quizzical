import React from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Layout from "./components/pages/Layout";
import Quiz, { loader as quizLoader } from "./components/pages/Quiz";
import { ThemeProvider } from "./components/ThemeContext";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="quiz"
          element={<Quiz />}
          loader={quizLoader}
          errorElement={<h1>Easy to deal with an error here</h1>}
        />
      </Route>
    )
  );

  return (
    <ThemeProvider >
      <div>
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
