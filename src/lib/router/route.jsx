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
import PerizinanPages from "@/pages/Muysrif/Perizinan/PerizinanPages";
import EditPelanggaranPages from "@/pages/Muysrif/Pelanggaran/EditPelanggaranPages";
import CreatePerizinanPages from "@/pages/Muysrif/Perizinan/CreatePerizinanPages";
import NotFoundPage from "@/notfound";
import EditProfil from "@/pages/Orang Tua/SettingsAccount/EditProfil";
import PerizinanEditPages from "@/pages/Muysrif/Perizinan/EditPerizinanPages";
import UbahPassword from "@/pages/Orang Tua/SettingsAccount/UbahPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import UpdatePassword from "@/pages/auth/UpdatePassword";
import AjukanIzinPage from "@/pages/Orang Tua/AjukanIzin/AjukanIzin";
import KeamananPages from "@/pages/Keamanan/Keamanan";
import CreatePerizinanPagesKeamanan from "@/pages/Keamanan/Perizinan/CreatePerizinanPages";
import PerizinanEditPagesKeamanan from "@/pages/Keamanan/Perizinan/EditPerizinanPages";
import PerizinanPagesKeamanan from "@/pages/Keamanan/Perizinan/PerizinanPages";
import RoleBasedLayout from "@/components/layout/AdminRoleLayout";

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
    path: "/musyrif",
    element: (
      <AuthRole allowedRoles={["musyrif"]}>
        <RoleBasedLayout />
      </AuthRole>
    ),
    children: [
      { path: "dashboard", element: <MusyrifPage /> },
      { path: "kesehatan", element: <Kesehatan /> },
      { path: "kesehatan/detail/:id", element: <DetailKesehatanPage /> },
      {
        path: "master-data/pelanggaran/jenis-pelanggaran",
        element: <JenisPelanggaranPages />,
      },
      {
        path: "master-data/pelanggaran/kategori-pelanggaran",
        element: <KategoriPelanggaranPages />,
      },
      {
        path: "master-data/perizinan/keterangan-izin",
        element: <KeteranganIzinPages />,
      },
      { path: "pelanggaran", element: <PelanggaranPages /> },
      { path: "pelanggaran/create", element: <PelanggaranCreatePages /> },
      { path: "pelanggaran/edit/:id", element: <EditPelanggaranPages /> },
      { path: "perizinan", element: <PerizinanPages /> },
      { path: "perizinan/create", element: <CreatePerizinanPages /> },
      { path: "perizinan/edit/:id", element: <PerizinanEditPages /> },
      { path: "profile/:id", element: <ProfilePages /> },
    ],
  },
  {
    path: "/keamanan",
    element: (
      <AuthRole allowedRoles={["keamanan"]}>
        <RoleBasedLayout />
      </AuthRole>
    ),
    children: [
      {
        path: "dashboard",
        element: <KeamananPages />,
      },
      {
        path: "perizinan",
        element: <PerizinanPagesKeamanan />,
      },
      {
        path: "perizinan/create",
        element: <CreatePerizinanPagesKeamanan />,
      },
      {
        path: "perizinan/edit/:id",
        element: <PerizinanEditPagesKeamanan />,
      },
      { path: "profile/:id", element: <ProfilePages /> },
    ],
  },

  {
    path: "/orangtua",
    element: <OrangtuaPage />,
  },
  {
    path: "/profile/:id",
    element: (
      <AuthRole allowedRoles={["musyrif", "keamanan"]}>
        <ProfilePages />
      </AuthRole>
    ),
  },
  {
    path: "/orangtua/dashboard",
    element: (
      <AuthRole allowedRoles={["orang_tua"]}>
        <OrangtuaPage />,
      </AuthRole>
    ),
  },
  {
    path: "/orangtua/santri",
    element: (
      <AuthRole allowedRoles={["orang_tua"]}>
        <SantriPage />
      </AuthRole>
    ),
  },
  {
    path: "/orangtua/ajukanizin",
    element: (
      <AuthRole allowedRoles={["orang_tua"]}>
        <AjukanIzinPage />
      </AuthRole>
    ),
  },
  {
    path: "/orangtua/editprofil",
    element: (
      <AuthRole allowedRoles={["orang_tua"]}>
        <EditProfil />
      </AuthRole>
    ),
  },
  {
    path: "/orangtua/ubahkatasandi",
    element: (
      <AuthRole allowedRoles={["orang_tua"]}>
        <UbahPassword />
      </AuthRole>
    ),
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
