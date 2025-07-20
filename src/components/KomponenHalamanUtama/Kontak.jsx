/* eslint-disable */
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import {
  containerVariants,
  itemVariants,
  floatVariants,
  slideInVariants,
} from "./animationVariants";

const Kontak = () => {
  return (
    <motion.section
      id="contact"
      className="py-10 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-6">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-emerald-600 mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            Hubungi Kami
          </motion.h2>
          <motion.p
            className="text-xl text-emerald-700 max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Siap memulai perjalanan pendidikan di Santriverse? Hubungi kami
            untuk informasi lebih lanjut
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: Phone, title: "Telepon", content: "+62 123 4567 8900" },
              { icon: Mail, title: "Email", content: "info@santriverse.ac.id" },
              {
                icon: MapPin,
                title: "Alamat",
                content:
                  "JL. Ambatron, RT.03/RW.01, Sigma, Kec.Ohio,Kabupaten Ambatukam, Android Selatan",
              },
              {
                icon: Clock,
                title: "Jam Operasional",
                content: "Senin - Jumat: 08:00 - 16:00",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4"
                variants={slideInVariants}
                whileHover={{ x: 10, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center"
                  whileHover={{
                    scale: 1.1,
                    rotate: 360,
                    transition: { duration: 0.5 },
                  }}
                  variants={floatVariants}
                  animate="animate"
                >
                  <item.icon className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h4 className="text-lg font-semibold text-emerald-600">
                    {item.title}
                  </h4>
                  <p className="text-emerald-700 md:max-w-2/3 max-w-3/4">
                    {item.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              transition: { duration: 0.3 },
            }}
          >
            <motion.h3
              className="text-2xl font-bold text-emerald-600 mb-6"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Kirim Pesan
            </motion.h3>
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {["Nama Lengkap", "Email"].map((placeholder, index) => (
                <motion.input
                  key={index}
                  type={index === 1 ? "email" : "text"}
                  placeholder={placeholder}
                  className="w-full p-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  variants={itemVariants}
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)",
                  }}
                />
              ))}
              <motion.textarea
                placeholder="Pesan Anda"
                rows="4"
                className="w-full p-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                variants={itemVariants}
                whileFocus={{
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)",
                }}
              />
              <motion.button
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Kirim Pesan
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Kontak;
