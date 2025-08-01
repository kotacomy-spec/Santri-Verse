import DashboardKeamanan from "@/components/views/Keamanan/DashboardKeamanan";
import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";

const KeamananPages = () => {
  return (
    <>
      <DashboardLayout type="keamanan">
        <DashboardKeamanan />
      </DashboardLayout>
    </>
  );
};

export default KeamananPages;
