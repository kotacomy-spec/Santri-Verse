import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import PerizinanEdit from "@/components/views/Keamanan/Perizinan/PerizinanEdit/EditPerizinan";

const PerizinanEditPagesKeamanan = () => {
  return (
    <>
      <DashboardLayout type="keamanan">
        <PerizinanEdit />
      </DashboardLayout>
    </>
  );
};

export default PerizinanEditPagesKeamanan;
