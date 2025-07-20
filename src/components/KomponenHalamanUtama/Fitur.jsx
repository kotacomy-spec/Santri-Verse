/* eslint-disable */
import { UserCheck, HeartPulse, AlertCircle, Activity } from "lucide-react";
import {
  containerVariants,
  itemVariants,
  scaleVariants,
  floatVariants,
} from "./animationVariants";
import { motion } from "framer-motion";

const Fitur = () => {
  const fiturData = [
    {
      title: "Pantau Perizinan dan Aktivitas Anak",
      description:
        "Lihat status izin keluar, waktu kembali, dan riwayat aktivitas santri secara real-time tanpa perlu datang ke pesantren.",
      icon: UserCheck,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Lihat Catatan Pelanggaran",
      description:
        "Orang tua bisa melihat daftar pelanggaran yang pernah dilakukan anak beserta poin pelanggaran dan tindakan pembinaan yang diambil.",
      icon: AlertCircle,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Akses Data Kesehatan Santri",
      description:
        "Pantau kondisi kesehatan dan riwayat pengobatan anak di pesantren.",
      icon: HeartPulse,
      color: "from-emerald-600 to-teal-600",
    },
    {
      title: "Data Real-Time",
      description:
        "Semua informasi santri seperti izin, kesehatan, dan pelanggaran diperbarui secara otomatis tanpa perlu refresh.",
      icon: Activity,
      color: "from-emerald-600 to-teal-600",
    },
  ];

  return (
    <motion.div
      className="container mx-auto px-6 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <motion.div className="text-center mb-16" variants={itemVariants}>
        <motion.h2
          className="text-5xl font-bold text-emerald-600"
          initial={{ scale: 0.5, opacity: 0, y: -50 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          Fitur yang Didapat Orang Tua
        </motion.h2>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 gap-8"
        variants={containerVariants}
      >
        {fiturData.map((data, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg"
            variants={scaleVariants}
            whileHover={{
              y: -10,
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
              transition: { duration: 0.3 },
            }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div
              className={`w-16 h-16 bg-gradient-to-br ${data.color} flex items-center justify-center mb-4 rounded-lg`}
              whileHover={{
                rotate: 360,
                scale: 1.1,
                transition: { duration: 0.5 },
              }}
              variants={floatVariants}
              animate="animate"
            >
              <data.icon className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h4
              className="text-xl font-bold text-emerald-600 mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {data.title}
            </motion.h4>
            <motion.p
              className="text-gray-600 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {data.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Fitur;
