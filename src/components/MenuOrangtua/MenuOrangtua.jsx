/*eslint-disable */
import {
  CalendarCheck,
  CircleUserRound,
  LayoutGrid,
  MessageSquareDot,
  ShieldAlert,
  Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const menu = [
  {
    id: 1,
    icon: <LayoutGrid size={22} />,
    title: "Orangtua",
    link: "/orangtua",
  },
  {
    id: 2,
    icon: <CircleUserRound size={22} />,
    title: "Santri",
    link: "/santri",
  },
  {
    id: 3,
    icon: <CalendarCheck size={22} />,
    title: "Ajukan Izin",
    link: "/ajukanizin",
  },
  {
    id: 4,
    icon: <MessageSquareDot size={22} />,
    title: "Berita",
    link: "/berita",
  },
  {
    id: 5,
    icon: <Stethoscope size={22} />,
    title: "Kesehatan",
    link: "/kesehatan",
  },
  {
    id: 6,
    icon: <ShieldAlert size={22} />,
    title: "Pelanggaran",
    link: "/pelanggaran",
  },
];

export default function MenuOrangtua() {
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
      <div className="flex flex-col justify-center md:w-[82%] w-full mx-auto mb-4  ">
        <motion.ul
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="md:flex md:justify-center md:gap-10 grid grid-cols-3 grid-rows-2 w-full  md:bg-transparent  md:mx-auto  md:px-4 md:rounded-full"
        >
          {menu.map((item) => (
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              to={item.link}
              key={item.id}
              className={`flex justify-center items-center gap-2 md:bg-green-700 rounded-2xl md:py-4 py-2 md:h-full  w-28  md:text-sm text-sm   text-green-100  md:hover:bg-green-600 md:hover:text-green-200 md:duration-200 md:ease-linear md:hover:rounded-lg ${
                window.location.pathname === item.link
                  ? " md:hidden font-bold text-green-700"
                  : "md:text-gray-100 text-green-700 font-medium"
              }`}
            >
              <Link
                to={item.link}
                className={`flex flex-col justify-center items-center  gap-2 `}
              >
                <span className="bg-green-700 text-green-100 md:hidden rounded-2xl w-16 h-16 flex justify-center items-center">
                  {item.icon}
                </span>
                <span className="hidden md:flex ">{item.icon}</span>
                <p>{item.title}</p>
              </Link>
            </motion.div>
          ))}
        </motion.ul>
      </div>
    </>
  );
}
