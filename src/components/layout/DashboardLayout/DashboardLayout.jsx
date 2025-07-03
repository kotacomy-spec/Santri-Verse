import DashboardSidebar from "./DashboardLayoutSidebar/DashboardSidebar";

const DashboardLayout = (props) => {
  const { children } = props;
  return (
    <>
      <DashboardSidebar />
      <div>{children}</div>
    </>
  );
};

export default DashboardLayout;
