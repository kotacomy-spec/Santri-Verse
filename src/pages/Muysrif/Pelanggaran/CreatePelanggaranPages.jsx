import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import PelanggaranCreate from "@/components/views/Musyrif/Pelanggaran/PelanggaranCreate/PelanggaranCreate";

const PelanggaranCreatePages = () => {
  return (
    <>
      <DashboardLayout type="musyrif">
        <PelanggaranCreate />
      </DashboardLayout>
    </>
  );
};

export default PelanggaranCreatePages;
