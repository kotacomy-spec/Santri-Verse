import { useState } from "react";
import DashboardSidebar from "./DashboardLayoutSidebar/DashboardSidebar";
import { sidebarMusyrif } from "./DashboardMenu";

const DashboardLayout = (props) => {
  const { children, type } = props;
  {
    type;
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="max-w-screen-3xl 3xl:container flex">
        <DashboardSidebar sidebarItems={sidebarMusyrif} IsOpen={isOpen} />
        <div className="h-screen w-full overflow-y-auto ">
          <div className="mx-8 cursor-pointer mt-2 lg:hidden flex justify-end">
            <button
              onClick={toggleMenu}
              className="relative w-12 h-12 flex flex-col justify-center items-center transition-shadow duration-200"
              aria-label="Toggle menu"
            >
              <div
                className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ease-in-out ${
                  isOpen ? "rotate-45 translate-y-1.5" : "translate-y-0"
                }`}
              />
              <div
                className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ease-in-out my-1 ${
                  isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              />
              <div
                className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ease-in-out ${
                  isOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-0"
                }`}
              />
            </button>
          </div>
          <div className="p-8">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
