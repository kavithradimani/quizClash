import React, { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Quizzes = lazy(() => import("../pages/Quizzes"));
const Leaderboard = lazy(() => import("../pages/Leaderboard"));
const Page404 = lazy(() => import("../pages/Page404"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));

// routings
const routingData = {
  "/": <Home />,
  "/quiz": <Quizzes />,
  "/leaderboard": <Leaderboard />,
  "/login":<Login />,
  "/signup":<Signup />,
  "*": <Page404 />,
};

export default routingData;
