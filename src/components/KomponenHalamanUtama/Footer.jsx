/* eslint-disable */
import {
  BookOpenText,
  Facebook,
  Instagram,
  Phone,
  Youtube,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
  slideInVariants,
} from "./animationVariants";

const Footer = () => {
  return (
    <>
      <motion.div
        className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-white mx-4 sm:mx-20 my-6 rounded-2xl shadow-2xl"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
          transition: { duration: 0.3 },
        }}
      >
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl font-bold mb-3"
            variants={itemVariants}
          >
            Siap mendaftarkan anak Anda ke pesantren?
          </motion.h2>
          <motion.p
            className="text-lg leading-relaxed opacity-90 mb-6"
            variants={itemVariants}
          >
            Klik tombol di bawah untuk mulai proses pendaftaran dengan mudah dan
            cepat.
          </motion.p>
          <motion.button
            className="bg-white text-teal-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-all duration-200 shadow-md cursor-pointer"
            variants={itemVariants}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 10px 30px rgba(255,255,255,0.3)",
              y: -5,
            }}
            whileTap={{ scale: 0.95 }}
          >
            Daftar Sekarang!
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.footer
        className="bg-gray-900 text-white py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            <motion.div variants={slideInVariants}>
              <motion.div
                className="flex items-center space-x-3 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <BookOpenText className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold">Santri Verse</h3>
              </motion.div>
              <motion.p
                className="text-gray-400 mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                JL. Ambatron, RT.03/RW.01, Sigma, Kec.Ohio,Kabupaten Ambatukam,
                Android Selatan
              </motion.p>
              <motion.div
                className="flex items-center space-x-2 text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Phone className="w-4 h-4" />
                <span>(0888-307-7077)</span>
              </motion.div>
            </motion.div>

            <motion.div variants={slideInVariants}>
              <motion.h4
                className="text-lg font-bold mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Layanan Informasi
              </motion.h4>
              <motion.div
                className="space-y-2 text-gray-400"
                variants={containerVariants}
              >
                {[
                  "0813-3622-2034 (Raiden Shogun)",
                  "0821-4639-3907 (Nahida)",
                  "0852-5880-0137 (Alhaitham)",
                  "0822-4633-5137 (Furina)",
                ].map((contact, index) => (
                  <motion.p
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 5, color: "#10b981" }}
                  >
                    {contact}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>

            <motion.div variants={slideInVariants}>
              <motion.h4
                className="text-lg font-bold mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Media Sosial
              </motion.h4>
              <motion.div
                className="flex space-x-4"
                variants={containerVariants}
              >
                {[
                  { icon: Facebook, color: "bg-blue-600 hover:bg-blue-700" },
                  { icon: Instagram, color: "bg-pink-600 hover:bg-pink-700" },
                  { icon: Youtube, color: "bg-red-600 hover:bg-red-700" },
                ].map((social, index) => (
                  <motion.div
                    key={index}
                    className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center transition-colors cursor-pointer`}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.5 },
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.p
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              ©Santri Verse
            </motion.p>
            <motion.p
              className="mt-1"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Dikembangkan oleh{" "}
              <span className="text-gray-300 font-medium">Naufal</span> &amp;{" "}
              <span className="text-gray-300 font-medium">Dias</span> – SMKN 8
              Malang
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.footer>
    </>
  );
};
export default Footer;
