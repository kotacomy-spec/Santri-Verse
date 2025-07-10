import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import Kesehatan from "@/components/views/Musyrif/Kesahatan/Kesehatan";
import KesehatanDetailPage from "@/components/views/Musyrif/Kesahatan/DetailKesehatan/DetailKesehatan";

const KesehatanPages = () => {
  return (
    <>
      <DashboardLayout type="musyrif">
        <Kesehatan />
      </DashboardLayout>
    </>
  );
};

export default KesehatanPages;
