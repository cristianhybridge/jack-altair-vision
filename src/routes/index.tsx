import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/reports", element: <Home /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

export default router;
