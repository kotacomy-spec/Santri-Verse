/* eslint-disable */
import { UserCheck, HeartPulse, AlertCircle, Activity } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const listItemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-6 py-20 mb-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.h2
            variants={titleVariants}
            className="text-5xl font-bold text-emerald-600 mb-6"
          >
            Tentang Santri Verse
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Santri Verse adalah platform pendaftaran dan manajemen santri yang
            dibuat untuk memudahkan orang tua mendaftarkan anak ke pesantren
            tanpa harus datang langsung.
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-lg"
        >
          <motion.h3
            variants={titleVariants}
            className="text-3xl font-bold mb-3 text-emerald-600"
          >
            Kenapa Pilih Santri Verse ?
          </motion.h3>
          <motion.ul
            variants={listVariants}
            className="text-lg text-gray-700 leading-relaxed opacity-90 list-inside space-y-2 list-none"
          >
            {[
              "✅ Pendaftaran 100% Online",
              "✅ Terintegrasi dengan WhatsApp & Email",
              "✅ Update Data Santri Real-Time",
              "✅ Aman dan Mudah Digunakan",
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={listItemVariants}
                whileHover={{
                  x: 10,
                  transition: { duration: 0.2 },
                }}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </>
  );
};

export default About;
