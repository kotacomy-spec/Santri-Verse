import { createBrowserRouter } from "react-router-dom";
import LoginPages from "@/pages/auth/Login";
import MusyrifPage from "@/pages/Muysrif/Musyrif";
import Kesehatan from "@/pages/Muysrif/Kesehatan/Kesehatan";
import DetailKesehatanPage from "@/pages/Muysrif/Kesehatan/DetailKesehatan";
import NotFoundPage from "@/notfound";
import OrangtuaPage from "@/pages/Orang Tua/Orangtua";
import SantriPage from "@/pages/Santri/Santri";
import ProfilePages from "@/pages/Profile";

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
    path: "/orangtua",
    element: <OrangtuaPage />,
  },
  {
    path: "/santri",
    element: <SantriPage />,
  },
  {
    path: "/profile/:id",
    element: <ProfilePages />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
