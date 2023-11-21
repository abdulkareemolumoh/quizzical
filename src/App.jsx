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
import { AuthProvider } from "./components/AuthContext";
import QuizLayout from "./pages/QuizLayout";
import ErrorElement from "./pages/Error";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/profilePage"
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />

        <Route element={<QuizLayout />}>
          <Route path="quiz" element={<Quiz />} />
          <Route path="profilePage" element={<ProfilePage />} />
          <Route path="*" element={<ErrorElement />} />
        </Route>
      </Route>
    )
  );



  return (
    <AuthProvider>
      <ThemeProvider>
        {/* {contextHolder} */}
        <div>
          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
