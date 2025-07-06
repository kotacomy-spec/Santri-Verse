import DashboardSidebar from "./DashboardLayoutSidebar/DashboardSidebar";
import { sidebarMusyrif } from "./DashboardMenu";

const DashboardLayout = (props) => {
  const { children, type } = props;
  return (
    <>
      <div className="max-w-screen-3xl 3xl:container flex">
        <DashboardSidebar sidebarItems={sidebarMusyrif} />
        <div className="h-screen w-full overflow-y-auto p-8">{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;
