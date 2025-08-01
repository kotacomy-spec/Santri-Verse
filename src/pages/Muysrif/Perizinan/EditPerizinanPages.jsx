import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import PerizinanEdit from "@/components/views/Musyrif/Perizinan/PerizinanEdit/EditPerizinan";

const PerizinanEditPages = () => {
  return (
    <>
      <DashboardLayout type="musyrif">
        <PerizinanEdit />
      </DashboardLayout>
    </>
  );
};

export default PerizinanEditPages;
