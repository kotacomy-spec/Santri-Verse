import {
  CircleUserRound,
  LayoutGrid,
  MessageSquareDot,
  ShieldAlert,
  Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";

const menu = [
  {
    id: 1,
    icon: <LayoutGrid size={19} />,
    title: "Orangtua",
    link: "/orangtua",
  },
  {
    id: 2,
    icon: <CircleUserRound size={19} />,
    title: "Santri",
    link: "/santri",
  },
  {
    id: 3,
    icon: <MessageSquareDot size={19} />,
    title: "Pengumuman",
    link: "/pengumuman",
  },
  {
    id: 4,
    icon: <Stethoscope size={19} />,
    title: "Kesehatan",
    link: "/kesehatan",
  },
  {
    id: 5,
    icon: <ShieldAlert size={19} />,
    title: "Pelanggaran",
    link: "/pelanggaran",
  },
];

export default function NavbarOrangtua() {
  return (
    <>
      <div className="flex  items-center justify-center my-14 w-full">
        <ul className="flex  justify-around  w-[90%] my-4 py-2 px-6 fixed bottom-0  bg-green-100 rounded-2xl shadow-xl">
          {menu.map((item) => (
            <Link
              to={item.link}
              key={item.id}
              className={`flex flex-col gap-1 text-sm font-medium justify-center items-center py-2 ${
                window.location.pathname === item.link
                  ? "text-green-700"
                  : "text-gray-700"
              }`}
            >
              <span>{item.icon}</span>
              {item.title}
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}
