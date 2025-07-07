import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import Kesehatan from "@/components/views/Musyrif/Kesehatan";

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
