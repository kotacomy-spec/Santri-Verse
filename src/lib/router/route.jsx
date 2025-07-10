import { createBrowserRouter } from "react-router-dom";
import LoginPages from "@/pages/auth/Login";
import MusyrifPage from "@/pages/Muysrif/Musyrif";
import Kesehatan from "@/pages/Muysrif/Kesehatan/Kesehatan";
import DetailKesehatanPage from "@/pages/Muysrif/Kesehatan/DetailKesehatan";
import OrangtuaPage from "@/pages/Orang Tua/Orangtua";
import SantriPage from "@/pages/Santri/Santri";
import JenisPelanggaranPages from "@/pages/Muysrif/MasterData/Pelanggaran/JenisPelanggaranPages";
import KategoriPelanggaranPages from "@/pages/Muysrif/MasterData/Pelanggaran/KategoriPelanggaran";
import KeteranganIzinPages from "@/pages/Muysrif/MasterData/Perizinan/KeteranganIzin";
import ProfilePages from "@/pages/Profile";
import NotFoundPage from "@/notfound";
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
    path: "/musyrif/master-data/pelanggaran/jenis-pelanggaran",
    element: <JenisPelanggaranPages />,
  },
  {
    path: "/orangtua",
    element: <OrangtuaPage />,
  },
  {
    path: "/musyrif/master-data/pelanggaran/kategori-pelanggaran",
    element: <KategoriPelanggaranPages />,
  },
  {
    path: "/musyrif/master-data/perizinan/keterangan-izin",
    element: <KeteranganIzinPages />,
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
]);
