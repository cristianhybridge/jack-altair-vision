import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";
import Home from "../pages/Home.tsx";
import About from "../pages/About.tsx";
import Login from "../pages/Login.tsx";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

export default router;
