import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import EditPelanggaran from "@/components/views/Musyrif/Pelanggaran/PelanggaranEdit/PelanggaranEdit";

const EditPelanggaranPages = () => {
  return (
    <>
      <DashboardLayout type="musyrif">
        <EditPelanggaran />
      </DashboardLayout>
    </>
  );
};

export default EditPelanggaranPages;
