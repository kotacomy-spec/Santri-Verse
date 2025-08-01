import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import Pelanggaran from "@/components/views/Musyrif/Pelanggaran/Pelanggaran";

const PelanggaranPages = () => {
  return (
    <>
      <DashboardLayout type="musyrif">
        <Pelanggaran />
      </DashboardLayout>
    </>
  );
};

export default PelanggaranPages;
