/* eslint-disable */
import {
  Bell,
  BookOpenText,
  LockKeyhole,
  LogOut,
  MessageCircleQuestionMark,
  User,
  UserPen,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Notification from "@/components/OrangtuaComponent/NotificationHeader";
import { supabase } from "@/lib/supabase/supabaseClient";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const dataSementaraAkunOrtu = "url('/profile-default.png')";

const dataSideBar = [
  {
    title: "Edit Profil",
    icon: <UserPen size={20} />,
    link: "/orangtua/editprofil",
  },
  {
    title: "Ubah Kata Sandi",
    icon: <LockKeyhole size={20} />,
    link: "/orangtua/ubahkatasandi",
  },
  {
    title: "FAQ",
    icon: <MessageCircleQuestionMark size={20} />,
    link: "/orangtua/faq",
  },
];

export default function OrangtuaHeader({ title }) {
  const [tampil, setTampil] = useState(false);
  const [muncul, setMuncul] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Mengambil Data User Orangtua
  const [profilUser, setProfilUser] = useState({});
  const getAkunOrangtua = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const emailUser = user.email;
    const { data, error } = await supabase
      .from("profiles")
      .select(`*`)
      .eq("id", user.id)
      .single();
    if (error) {
      console.log(error);
    } else {
      setProfilUser({
        id: data.id,
        nama: data.full_name,
        email: emailUser,
      });
    }
  };
  const namaDepan = profilUser?.nama?.split(" ")[0] || "";
  useEffect(() => {
    getAkunOrangtua();
  }, []);
  // Mengambil Data User Orangtua

  // Logout
  const navigate = useNavigate();

  const handleLogout = async () => {
    const toastId = toast.loading("Mohon tunggu sebentar...");

    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      toast.success("Berhasil Logout", {
        id: toastId,
      });
      navigate("/auth/login");
    } catch (error) {
      console.log("error :", error);
      toast.error(error?.message || "Terjadi Kesalahan", {
        id: toastId,
      });
    }
  };
  // Logout

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="flex h-full justify-between border-b-2 border-gray-200  py-3 px-4 mx-6 relative"
      >
        <AnimatePresence>
          {muncul ? (
            <motion.div
              initial={{
                opacity: 0,
                y: -300,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              exit={{ opacity: 0, y: -300 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`
            absolute top-20  right-0  z-10`}
            >
              <Notification />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="flex justify-between gap-2 items-center">
          <Link
            to="/orangtua/dashboard"
            className="bg-green-100 text-green-700 w-fit h-fit p-1.5 rounded-[8px]"
          >
            <div className="rounded-full border-2 border-green-700 p-1.5">
              <BookOpenText size={20} />
            </div>
          </Link>
          <div className="flex flex-col justify-center h-fit font-semibold">
            <h1 className="text-lg">{title}</h1>
            <p className="text-sm text-gray-500">SantriVerse</p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={() => {
              setMuncul(!muncul);
            }}
            className=" text-green-700 hover:cursor-pointer"
          >
            <Bell size={22} />
          </button>
          <button
            onClick={() => setTampil(!tampil)}
            className=" text-green-700 hover:cursor-pointer"
          >
            <User size={22} />
          </button>
        </div>
      </motion.div>
      <AnimatePresence>
        {tampil && (
          <>
            <motion.div
              onClick={() => setTampil(tampil)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-10"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={`fixed top-0 bg-white/70 backdrop-blur-sm right-0 h-dvh lg:w-[20%] md:w-[40%] w-[60%] z-20 ${
                tampil ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex justify-end w-full">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  transition={{ duration: 0.3, ease: "linear" }}
                  onClick={() => setTampil(!tampil)}
                  className="flex  justify-center items-center  hover:cursor-pointer   text-green-700 px-4 py-3"
                >
                  <X />
                </motion.button>
              </div>
              <div className="flex flex-col justify-start px-4 h-full">
                <div className=" h-fit flex justify-center items-center gap-2 mb-4 text-green-700 font-bold  ">
                  <BookOpenText size={40} />
                  <h1>SantriVerse</h1>
                </div>
                <div className="h-fit flex flex-col  justify-center items-center w-full pb-4 pt-6 font-semibold text-green-700 border-t-2 border-green-700">
                  <div
                    className="rounded-full w-20 h-20 bg-cover bg-center mb-2"
                    style={{ backgroundImage: `${dataSementaraAkunOrtu}` }}
                  ></div>
                  <h1>{namaDepan}</h1>
                  <p className="text-xs font-medium text-gray-600">
                    {profilUser.email}
                  </p>
                </div>
                <ul className=" h-fit   border-green-700 py-4">
                  {dataSideBar.map(function (menu) {
                    return (
                      <Link
                        to={menu.link}
                        className={`flex gap-2 text-sm font-medium px-4 py-2 rounded-md  ${
                          window.location.pathname === menu.link
                            ? "bg-green-700 text-green-100 hover:bg-green-100/80 hover:text-green-700 hover:scale-105 duration-300 ease-in-out hover:shadow-md"
                            : "text-green-700 hover:bg-green-100/80 hover:scale-105 duration-300 ease-in-out hover:shadow-md"
                        }`}
                      >
                        {menu.icon}
                        {menu.title}
                      </Link>
                    );
                  })}
                </ul>
                <button
                  onClick={handleLogout}
                  className="flex justify-center items-center gap-2 text-sm absolute bottom-5 ml-4 text-red-600 font-semibold hover:gap-3 duration-300 ease-in-out cursor-pointer"
                >
                  <LogOut size={20} />
                  <h1>Logout</h1>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
