import { createBrowserRouter } from "react-router-dom";
import HalamanUtama from "@/components/views/HalamanUtama";
import LoginPages from "@/pages/auth/Login";
// import MusyrifPage from "@/pages/Muysrif/Musyrif";
import Kesehatan from "@/pages/Muysrif/Kesehatan/Kesehatan";
import DetailKesehatanPage from "@/pages/Muysrif/Kesehatan/DetailKesehatan";
import OrangtuaPage from "@/pages/Orang Tua/Beranda";
import SantriPage from "@/pages/Orang Tua/Santri/Santri";
import JenisPelanggaranPages from "@/pages/Muysrif/MasterData/Pelanggaran/JenisPelanggaranPages";
import KategoriPelanggaranPages from "@/pages/Muysrif/MasterData/Pelanggaran/KategoriPelanggaran";
import KeteranganIzinPages from "@/pages/Muysrif/MasterData/Perizinan/KeteranganIzin";
import PelanggaranPages from "@/pages/Muysrif/Pelanggaran/PelanggaranPages";
import PelanggaranCreatePages from "@/pages/Muysrif/Pelanggaran/CreatePelanggaranPages";
import ProfilePages from "@/pages/Profile";
import MusyrifPage from "@/pages/Muysrif/Musyrif";
import EditPelanggaranPages from "@/pages/Muysrif/Pelanggaran/EditPelanggaranPages";
import PerizinanPages from "@/pages/Muysrif/Perizinan/PerizinanPages";
import NotFoundPage from "@/notfound";
import EditProfil from "@/pages/Orang Tua/SettingsAccount/EditProfil";
import UbahPassword from "@/pages/Orang Tua/SettingsAccount/UbahPassword";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HalamanUtama />,
  },
  {
    path: "/auth/login",
    element: <LoginPages />,
  },
  {
    path: "/musyrif/dashboard",
    element: <MusyrifPage />,
  },
  // {
  //   path: "/musyrif/dashboard/slicing",
  //   element: <DashboardSlicing />,
  // },
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
    path: "/musyrif/master-data/pelanggaran/kategori-pelanggaran",
    element: <KategoriPelanggaranPages />,
  },
  {
    path: "/musyrif/master-data/perizinan/keterangan-izin",
    element: <KeteranganIzinPages />,
  },
  {
    path: "/musyrif/pelanggaran",
    element: <PelanggaranPages />,
  },
  {
    path: "/musyrif/pelanggaran/create",
    element: <PelanggaranCreatePages />,
  },
  {
    path: "/musyrif/pelanggaran/edit/:id",
    element: <EditPelanggaranPages />,
  },
  {
    path: "/musyrif/perizinan",
    element: <PerizinanPages />,
  },
  {
    path: "/profile/:id",
    element: <ProfilePages />,
  },
  {
    path: "/orangtua/dashboard",
    element: <OrangtuaPage />,
  },
  {
    path: "/orangtua/santri",
    element: <SantriPage />,
  },
  {
    path:"/orangtua/editprofil",
    element:<EditProfil/>
  },
  {
    path:"/orangtua/ubahkatasandi",
    element:<UbahPassword/>
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
