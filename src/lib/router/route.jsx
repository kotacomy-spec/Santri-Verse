import { createBrowserRouter } from "react-router-dom";
import AuthRole from "./Auth";
import HalamanUtama from "@/components/views/HalamanUtama";
import LoginPages from "@/pages/auth/Login";
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
import ResetPassword from "@/pages/auth/ResetPassword";
import UpdatePassword from "@/pages/auth/UpdatePassword";
import AjukanIzinPage from "@/pages/Orang Tua/AjukanIzin/AjukanIzin";

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

    element: (
      <AuthRole allowedRoles={["musyrif"]}>
        <MusyrifPage />
      </AuthRole>
    ),
  },
  {
    path: "/musyrif/kesehatan",
    element: (
      <AuthRole allowedRoles={["musyrif"]}>
        <Kesehatan />
      </AuthRole>
    ),
  },
  {
    path: "/musyrif/kesehatan/detail/:id",
    element: (
      <AuthRole allowedRoles={["musyrif"]}>
        <DetailKesehatanPage />
      </AuthRole>
    ),
  },
  {
    path: "/musyrif/master-data/pelanggaran/jenis-pelanggaran",
    element: (
      <AuthRole allowedRoles={["musyrif"]}>
        <JenisPelanggaranPages />
      </AuthRole>
    ),
  },
  {
    path: "/musyrif/master-data/pelanggaran/kategori-pelanggaran",
    element: (
      <AuthRole allowedRoles={["musyrif"]}>
        <KategoriPelanggaranPages />,
      </AuthRole>
    ),
  },
  {
    path: "/musyrif/master-data/perizinan/keterangan-izin",
    element: (
      <AuthRole allowedRoles={["musyrif"]}>
        <KeteranganIzinPages />
      </AuthRole>
    ),
  },
  {
    path: "/musyrif/pelanggaran",
    element: (
      <AuthRole allowedRoles={["musyrif"]}>
        <PelanggaranPages />
      </AuthRole>
    ),
  },

  {
    path: "/musyrif/pelanggaran/create",
    element: (
      <AuthRole allowedRoles={["musyrif"]}>
        <PelanggaranCreatePages />
      </AuthRole>
    ),
  },

  {
    path: "/musyrif/pelanggaran/edit/:id",
    element: (
      <AuthRole allowedRoles={["musyrif"]}>
        <EditPelanggaranPages />
      </AuthRole>
    ),
  },

  {
    path: "/musyrif/perizinan",
    element: (
      <AuthRole allowedRoles={["musyrif"]}>
        <PerizinanPages />
      </AuthRole>
    ),
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
    path: "/orangtua/ajukanizin",
    element: <AjukanIzinPage />,
  },
  {
    path: "/orangtua/editprofil",
    element: <EditProfil />,
  },
  {
    path: "/orangtua/ubahkatasandi",
    element: <UbahPassword />,
  },
  {
    path: "/auth/forgot-password",
    element: <ResetPassword />,
  },
  {
    path: "/auth/update-password",
    element: <UpdatePassword />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
