/* eslint-disable */
import { useState, useEffect } from "react";
import { BookOpenText, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Lenis from "lenis";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Beranda", path: "hero" },
  { name: "Tentang", path: "about" },
  { name: "Fitur", path: "fitur" },
  { name: "Kontak", path: "kontak" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0 },
};

const Navbar = ({ scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lenis, setLenis] = useState(null);
  const [IsLogin, SetIsLogin] = useState(false);
  const [IsLoading, SetIsLoading] = useState(true);

  const navigate = useNavigate();

  const checkUserLogin = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        SetIsLogin(false);
        return null;
      }

      SetIsLogin(true);

      const { data: UserRole, error: ProfileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (ProfileError) throw error;

      return UserRole;
    } catch (error) {
      toast.error(
        error?.message || "Terjadi Kesealahan Saat Mendapatakan User"
      );
    }
  };

  const handleDashboardRoute = async () => {
    const { role } = await checkUserLogin();

    switch (role) {
      case "musyrif":
        navigate("/musyrif/dashboard");
        break;
      case "keamanan":
        navigate("/keamanan/dashboard");
        break;
      case "orangtua":
        navigate("/orangtua");
        break;
      default:
        navigate("/orangtua");
        break;
    }
  };

  useEffect(() => {
    const getUser = async () => {
      await checkUserLogin();

      SetIsLoading(false);
    };

    getUser();
  }, []);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    setLenis(lenisInstance);

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);

  const handleScrollTo = (targetId) => {
    if (lenis && scrollToSection) {
      scrollToSection(targetId, lenis);
    }
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`bg-white/95 backdrop-blur-sm shadow-lg w-full top-0 z-30 fixed`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <BookOpenText className="w-6 h-6 text-white" />
              </div>
              <h1 className="font-bold text-gray-800 text-lg">
                Santri<span className="text-emerald-600"> Verse</span>
              </h1>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleScrollTo(link.path)}
                  className="cursor-pointer px-3 py-2 rounded-lg transition-colors text-gray-600 hover:text-emerald-600"
                >
                  {link.name}
                </button>
              ))}
            </div>
            {IsLoading ? (
              <div className="hidden md:inline-block px-6 py-2 rounded-lg transition-all text-white bg-gradient-to-br from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 transform hover:scale-105 cursor-pointer">
                <Loader2 className="animate-spin mx-6" />
              </div>
            ) : IsLogin ? (
              <button
                onClick={handleDashboardRoute}
                className="hidden md:inline-block px-6 py-2 rounded-lg transition-all text-white bg-gradient-to-br from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 transform hover:scale-105 cursor-pointer"
              >
                Dashboard
              </button>
            ) : (
              <Link
                to="/auth/login"
                className="hidden md:inline-block px-6 py-2 rounded-lg transition-all text-white bg-gradient-to-br from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 transform hover:scale-105 cursor-pointer"
              >
                Login
              </Link>
            )}

            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 h-full w-80 max-w-full bg-white z-50 shadow-2xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex justify-between items-center p-5 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-full flex items-center justify-center">
                    <BookOpenText className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h1 className="font-bold text-gray-800 text-lg">
                    Santri<span className="text-emerald-600"> Verse</span>
                  </h1>
                </div>
                <button
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              <motion.div
                className="flex-1 p-5"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="mb-2"
                  >
                    <button
                      onClick={() => handleScrollTo(link.path)}
                      className="cursor-pointer block w-full text-left px-4 py-3 rounded-lg transition-all text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 font-medium"
                    >
                      {link.name}
                    </button>
                  </motion.div>
                ))}
              </motion.div>
              <div className="p-5 border-t border-gray-100">
                <Link
                  to={"/auth/login"}
                  className="block w-full text-center px-6 py-3 rounded-full transition-all text-white bg-gradient-to-br from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 font-medium shadow-md shadow-emerald-100"
                >
                  {}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
