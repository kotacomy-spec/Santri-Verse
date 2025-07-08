import { createBrowserRouter } from "react-router-dom";
import LoginPages from "@/pages/auth/Login";
import MusyrifPage from "@/pages/Muysrif/Musyrif";
import Kesehatan from "@/pages/Muysrif/Kesehatan/Kesehatan";
import DetailKesehatanPage from "@/pages/Muysrif/Kesehatan/DetailKesehatan";
import NotFoundPage from "@/notfound";

export const routes = createBrowserRouter([
  {
    path: "/auth/login",
    element: <LoginPages />,
  },
  {
    path: "/musyrif/dashboard",
    element: <MusyrifPage />,
  },
  {
    path: "/musyrif/kesehatan",
    element: <Kesehatan />,
  },
  {
    path: "/musyrif/kesehatan/detail/:id",
    element: <DetailKesehatanPage />,
  },
  {
    path: "/not-found",
    element: <NotFoundPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
