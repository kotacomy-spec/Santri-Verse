/*eslint-disable */
import {
  CalendarCheck,
  CircleUserRound,
  LayoutGrid,
  MessageSquareDot,
  ShieldAlert,
  Stethoscope,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Dock from "./DockMenu";

const deteksiPath = (path) => {
  // let location = useLocation;
  let locationPath = window.location.pathname;
  if (locationPath === path) {
    return "group bg-green-700 text-green-100";
  } else {
    return "group ";
  }
  // return location === path ? "group bg-green-700 text-green-100" : "group";
};

// const items = [
//   {
//     icon: (
//       <LayoutGrid className="w-5 h-5 duration-300 ease-in-out group-hover:scale-[140%]" />
//     ),
//     label: "Beranda",
//     linkNya: "/orangtua/dashboard",
//     className: deteksiPath("/orangtua/dashboard"),
//   },
//   {
//     icon: (
//       <CircleUserRound className="w-5 h-5 duration-300 ease-in-out group-hover:scale-125" />
//     ),
//     label: "Santri",
//     linkNya: "/orangtua/santri",
//     className: deteksiPath("/orangtua/santri"),
//   },
//   {
//     icon: (
//       <CalendarCheck className="w-5 h-5 duration-300 ease-in-out group-hover:scale-125" />
//     ),
//     label: "Ajukan Izin",
//     linkNya: "/orangtua/ajukanizin",
//     className: deteksiPath("/orangtua/ajukanizin"),
//   },
//   {
//     icon: (
//       <MessageSquareDot className="w-5 h-5 duration-300 ease-in-out group-hover:scale-125" />
//     ),
//     label: "Berita",
//     linkNya: "/orangtua/berita",
//     className: deteksiPath("/orangtua/berita"),
//   },
//   {
//     icon: (
//       <Stethoscope className="w-5 h-5 duration-300 ease-in-out group-hover:scale-125" />
//     ),
//     label: "Kesehatan",
//     linkNya: "/orangtua/kesehatan",
//     className: deteksiPath("/orangtua/kesehatan"),
//   },
//   {
//     icon: (
//       <ShieldAlert className="w-5 h-5 duration-300 ease-in-out group-hover:scale-125" />
//     ),
//     label: "Pelanggaran",
//     linkNya: "/orangtua/pelanggaran",
//     className: deteksiPath("/orangtua/pelanggaran"),
//   },
// ];

const menu = [
  {
    id: 1,
    icon: <LayoutGrid size={22} />,
    title: "Beranda",
    link: "/orangtua/dashboard",
  },
  {
    id: 2,
    icon: <CircleUserRound size={22} />,
    title: "Santri",
    link: "/orangtua/santri",
  },
  {
    id: 3,
    icon: <CalendarCheck size={22} />,
    title: "Ajukan Izin",
    link: "/orangtua/ajukanizin",
  },
  {
    id: 4,
    icon: <MessageSquareDot size={22} />,
    title: "Berita",
    link: "/orangtua/berita",
  },
  {
    id: 5,
    icon: <Stethoscope size={22} />,
    title: "Kesehatan",
    link: "/orangtua/kesehatan",
  },
  {
    id: 6,
    icon: <ShieldAlert size={22} />,
    title: "Pelanggaran",
    link: "/orangtua/pelanggaran",
  },
];

export default function MenuOrangtua() {
  // Handle menu Dock
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleChange = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handleChange);
    return () => window.removeEventListener("popstate", handleChange);
  }, []);
  const masihAktif = (path) => {
    const locationPath = window.location.pathname;
    if (locationPath === path) {
      return "group bg-green-700 text-green-100";
    } else {
      return "group bg-green-100 text-green-700 ";
    }
  };

  const items = [
    {
      icon: (
        <LayoutGrid className="w-5 h-5 duration-300 ease-in-out group-hover:scale-[140%]" />
      ),
      label: "Beranda",
      linkNya: "/orangtua/dashboard",
      className: masihAktif("/orangtua/dashboard"),
    },
    {
      icon: (
        <CircleUserRound className="w-5 h-5 duration-300 ease-in-out group-hover:scale-[140%]" />
      ),
      label: "Santri",
      linkNya: "/orangtua/santri",
      className: masihAktif("/orangtua/santri"),
    },
    {
      icon: (
        <CalendarCheck className="w-5 h-5 duration-300 ease-in-out group-hover:scale-[140%]" />
      ),
      label: "Ajukan Izin",
      linkNya: "/orangtua/ajukanizin",
      className: masihAktif("/orangtua/ajukanizin"),
    },
    {
      icon: (
        <MessageSquareDot className="w-5 h-5 duration-300 ease-in-out group-hover:scale-[140%]" />
      ),
      label: "Berita",
      linkNya: "/orangtua/berita",
      className: masihAktif("/orangtua/berita"),
    },
    {
      icon: (
        <Stethoscope className="w-5 h-5 duration-300 ease-in-out group-hover:scale-[140%]" />
      ),
      label: "Kesehatan",
      linkNya: "/orangtua/kesehatan",
      className: masihAktif("/orangtua/kesehatan"),
    },
    {
      icon: (
        <ShieldAlert className="w-5 h-5 duration-300 ease-in-out group-hover:scale-[140%]" />
      ),
      label: "Pelanggaran",
      linkNya: "/orangtua/pelanggaran",
      className: masihAktif("/orangtua/pelanggaran"),
    },
  ];

  // Handle menu Dock

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <>
      <div className="md:hidden flex flex-col justify-center md:w-[82%] w-full mx-auto mb-4  ">
        <motion.ul
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className=" px-4  grid grid-cols-3 grid-rows-2 w-full  md:bg-transparent  md:mx-auto  md:px-4 md:rounded-full"
        >
          {menu.map((item) => (
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.9 }}
              to={item.link}
              key={item.id}
              className={`flex justify-center items-center gap-2  rounded-2xl py-4 md:h-full   md:text-sm text-sm   text-green-100  md:hover:bg-green-600 md:hover:text-green-200 md:duration-200 md:ease-linear md:hover:rounded-lg cursor-pointer ${
                window.location.pathname === item.link
                  ? " md:hidden font-bold text-green-700 "
                  : "md:text-gray-100 text-green-700 font-medium"
              }`}
            >
              <Link
                to={item.link}
                className={`flex flex-col justify-center items-center  gap-2 `}
              >
                <span
                  className={`${
                    window.location.pathname === item.link
                      ? "bg-green-100 border-2 border-green-700 text-green-700"
                      : "bg-green-700"
                  }  text-green-100 md:hidden rounded-2xl w-16 h-16 flex justify-center items-center`}
                >
                  {item.icon}
                </span>
                <span className="hidden md:flex ">{item.icon}</span>
                <p>{item.title}</p>
              </Link>
            </motion.div>
          ))}
        </motion.ul>
      </div>
      <div className="md:flex hidden fixed bottom-0 z-10  mx-auto right-0 left-0 mb-6 ">
        <Dock
          items={items}
          panelHeight={72}
          baseItemSize={50}
          magnification={60}
          className={
            "bg-green-100/30 backdrop-blur-[5px] border border-green-700"
          }
        />
      </div>
    </>
  );
}
