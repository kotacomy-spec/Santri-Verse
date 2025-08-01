import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import Perizinan from "@/components/views/Keamanan/Perizinan/Perizinan";

const PerizinanPagesKeamanan = () => {
  return (
    <>
      <DashboardLayout type="keamanan">
        <Perizinan />
      </DashboardLayout>
    </>
  );
};

export default PerizinanPagesKeamanan;
