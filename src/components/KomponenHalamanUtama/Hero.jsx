import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  // Variants untuk animasi container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  // Variants untuk animasi item
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Variants untuk animasi title
  const titleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  // Variants untuk floating circles
  const circleVariants = {
    animate: {
      y: [-10, 10, -10],
      x: [-5, 5, -5],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex justify-center items-center relative overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            variants={circleVariants}
            animate="animate"
            className="absolute top-20 left-10 w-32 h-32 bg-emerald-500 rounded-full"
          />
          <motion.div
            variants={circleVariants}
            animate="animate"
            transition={{ delay: 2 }}
            className="absolute top-40 right-20 w-24 h-24 bg-teal-500 rounded-full"
          />
          <motion.div
            variants={circleVariants}
            animate="animate"
            transition={{ delay: 4 }}
            className="absolute bottom-20 left-1/4 w-16 h-16 bg-emerald-400 rounded-full"
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center items-center flex-col z-20"
        >
          <motion.div variants={itemVariants}>
            <motion.h1
              variants={titleVariants}
              className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight text-center mb-2"
            >
              Pesantren {""}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Santri Verse
              </motion.span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl max-w-3xl text-center text-gray-600 leading-relaxed mx-5"
            >
              Pondok Pesantren Santri Verse - Membentuk generasi Qur'ani yang
              berakhlak mulia dan berprestasi.
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4 mt-8">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all flex items-center justify-center group"
            >
              Daftar Sekarang
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                borderColor: "rgb(16, 185, 129)",
              }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer border-2 border-emerald-500 text-emerald-600 px-8 py-4 rounded-xl hover:bg-emerald-50 transition-colors"
            >
              Pelajari Lebih Lanjut
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Animated particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-300 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </section>
    </>
  );
};

export default Hero;
