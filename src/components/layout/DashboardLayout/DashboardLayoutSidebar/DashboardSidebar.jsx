import UserNav from "@/components/UserComponent/UserNav";
import { cn } from "@/lib/utils";
import { BookOpenText, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const DashboardSidebar = (props) => {
  const { sidebarItems, IsOpen } = props;
  const [openMenus, setOpenMenu] = useState({});
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (href) => currentPath.startsWith(href);

  useEffect(() => {
    const openKeys = {};

    sidebarItems.forEach((item) => {
      if (item.childMenu) {
        item.childMenu.forEach((sub) => {
          if (sub.children) {
            sub.children.forEach((child) => {
              if (currentPath.startsWith(child.href)) {
                openKeys[item.key] = true;
                openKeys[sub.key] = true;
              }
            });
          }
          if (sub.href && currentPath.startsWith(sub.href)) {
            openKeys[item.key] = true;
          }
        });
      }
      if (item.href && currentPath.startsWith(item.href)) {
        openKeys[item.key] = true;
      }
    });

    setOpenMenu(openKeys);
  }, [currentPath, sidebarItems]);

  const toggleMenu = (key) => {
    setOpenMenu((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <div
        className={cn(
          "fixed z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col justify-between border-r-1 border-default-200 bg-white px-4 py-6 transition-all lg:relative lg:translate-x-0",
          { "translate-x-0": IsOpen }
        )}
      >
        <div>
          <div className="flex justify-center mb-5">
            <BookOpenText className="w-20 h-20 text-green-600 " />
          </div>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <div key={item.key}>
                {item.childMenu ? (
                  <div
                    className={`flex items-center justify-between gap-3 p-3 cursor-pointer rounded-lg transition-all 
                ${
                  isActive(item.href)
                    ? "bg-green-100 text-green-700 font-semibold"
                    : "hover:bg-gray-200"
                }`}
                    onClick={() => toggleMenu(item.key)}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                        openMenus[item.key] ? "rotate-0" : "rotate-180"
                      }`}
                    />
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`flex items-center justify-between gap-3 p-3 cursor-pointer rounded-lg transition-all 
                ${
                  isActive(item.href)
                    ? "bg-green-100 text-green-700 font-semibold"
                    : "hover:bg-gray-200"
                }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  </Link>
                )}

                {item.childMenu && openMenus[item.key] && (
                  <div className="ml-6 space-y-1 transition-all">
                    {item.childMenu.map((sub) => (
                      <div key={sub.key}>
                        {sub.children ? (
                          <div
                            className="flex items-center justify-between gap-3 p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-all"
                            onClick={() => toggleMenu(sub.key)}
                          >
                            <div className="flex items-center gap-3">
                              {sub.icon}
                              <span>{sub.label}</span>
                            </div>
                            <ChevronDown
                              className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                                openMenus[sub.key] ? "rotate-0" : "rotate-180"
                              }`}
                            />
                          </div>
                        ) : (
                          <Link
                            to={sub.href}
                            className="flex items-center justify-between gap-3 p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-all"
                          >
                            <div className="flex items-center gap-3">
                              {sub.icon}
                              <span>{sub.label}</span>
                            </div>
                          </Link>
                        )}
                        {sub.children && openMenus[sub.key] && (
                          <div className="ml-6 space-y-1">
                            {sub.children.map((child) => (
                              <Link
                                to={child.href}
                                className={cn(
                                  "flex items-center gap-3 p-2 cursor-pointer rounded-lg transition-all hover:bg-gray-100",
                                  {
                                    "bg-green-50 text-gr-700 border-r-2 border-green-600":
                                      isActive(child.href),
                                  }
                                )}
                              >
                                {child.icon}
                                <span>{child.label}</span>
                              </Link>
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
    </>
  );
};

export default DashboardSidebar;
