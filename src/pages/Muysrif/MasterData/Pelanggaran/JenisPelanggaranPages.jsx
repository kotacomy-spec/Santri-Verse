import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import JenisPelanggaran from "@/components/views/Musyrif/MasterData/Pelanggaran/JenisPelanggaran/JenisPelanggaran";

const JenisPelanggaranPages = () => {
  return (
    <>
      <DashboardLayout type="musyrif">
        <JenisPelanggaran />
      </DashboardLayout>
    </>
  );
};

export default JenisPelanggaranPages;
