import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import PerizinanCreate from "@/components/views/Keamanan/Perizinan/PerizinanCreate/PerizinanCreate";

const CreatePerizinanPagesKeamanan = () => {
  return (
    <>
      <DashboardLayout type="keamanan">
        <PerizinanCreate />
      </DashboardLayout>
    </>
  );
};

export default CreatePerizinanPagesKeamanan;
