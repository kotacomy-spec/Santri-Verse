import UserNav from "@/components/UserComponent/UserNav";
import { BookOpen, ChevronDown } from "lucide-react";
import { useState } from "react";

const DashboardSidebar = (props) => {
  const { sidebarItems } = props;
  const [openMenus, setOpenMenu] = useState({});
  const currentPath = window.location.pathname;

  const isActive = (href) => currentPath === href;

  const toggleMenu = (key) => {
    setOpenMenu((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="fixed lg:relative lg:translate-x-0 -translate-x-full z-50 flex h-screen w-full max-w-[300px] flex-col justify-between border-r-1 border-default-200 bg-white px-4 py-6 transition-all">
      <div>
        <div className="flex justify-center mb-5">
          <BookOpen className="w-20 h-20 text-green-600" />
        </div>
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <div key={item.key}>
              <div
                className={`flex items-center justify-between gap-3 p-3 cursor-pointer rounded-lg transition-all 
              ${
                isActive(item.href)
                  ? "bg-green-100 text-green-700 font-semibold"
                  : "hover:bg-gray-200"
              }`}
                onClick={() =>
                  item.childMenu
                    ? toggleMenu(item.key)
                    : (window.location.href = item.href)
                }
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.childMenu && (
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                      openMenus[item.key] ? "rotate-0" : "rotate-180"
                    }`}
                  />
                )}
              </div>

              {item.childMenu && openMenus[item.key] && (
                <div className="ml-6 space-y-1 transition-all">
                  {item.childMenu.map((sub) => (
                    <div key={sub.key}>
                      <div
                        className="flex items-center justify-between gap-3 p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-all"
                        onClick={() =>
                          sub.children
                            ? toggleMenu(sub.key)
                            : window.location.assign(sub.href)
                        }
                      >
                        <div className="flex items-center gap-3">
                          {sub.icon}
                          <span>{sub.label}</span>
                        </div>
                        {sub.children && (
                          <ChevronDown
                            className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                              openMenus[sub.key] ? "rotate-0" : "rotate-180"
                            }`}
                          />
                        )}
                      </div>
                      {sub.children && openMenus[sub.key] && (
                        <div className="ml-6 space-y-1">
                          {sub.children.map((child) => (
                            <div
                              key={child.key}
                              className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-all"
                              onClick={() => window.location.assign(child.href)}
                            >
                              {child.icon}
                              <span>{child.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center p-1">
        <UserNav />
      </div>
    </div>
  );
};

export default DashboardSidebar;
