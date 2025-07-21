/* eslint-disable */
import { CircleAlert } from "lucide-react";
import { dataSementara } from "../layout/AnakLayout/dataSementaraAnak";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef } from "react";

const AktivitasSementara = [
  {
    title: "Tidak Mengikuti Kajian Pagi",
    jenis: "Pelanggaran peribadatan",
    date: "Senin, 20 November 2023",
  },
  {
    title: "Merusak Fasilitas Kelas",
    jenis: "Pelanggaran Ketertiban umum dan perizinan",
    date: "Selasa, 21 November 2023",
  },
  {
    title: "Membuang Sampah Sembarangan",
    jenis: "Pelanggaran kebersihan dan kesehatan",
    date: "Rabu, 22 November 2023",
  },
];

function dataAnakHandler(jumlah, visibilitasSatu, visibilitasDua) {
  if (dataSementara.length >= jumlah || dataSementara.length === 0) {
    return visibilitasSatu;
  } else {
    return visibilitasDua;
  }
}

export default function PelanggaranTerbaru() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };
  return (
    <>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`md:mx-16 md:p-4   gap-4  ${dataAnakHandler(
          2,
          "hidden",
          "grid"
        )}`}
      >
        <h1 className="text-xl text-green-700 font-semibold mb-3">
          Pelanggaran Terbaru
        </h1>
        {AktivitasSementara.map(function (aktivitas) {
          return (
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-start  md:py-2 py-4   border border-red-600 rounded-2xl px-4"
            >
              <CircleAlert className=" text-red-600 mr-4" />
              <div className="flex md:flex-row flex-col justify-between w-full">
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold md:text-[1rem] text-sm ">
                    {aktivitas.title}
                  </h3>
                  <p className=" text-xs font-medium text-red-600 uppercase">
                    {aktivitas.jenis}
                  </p>
                </div>
                <span className="text-sm text-gray-500">{aktivitas.date}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}

export function PelanggaranAnakBanyak() {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          className="mt-4 mb-6 md:p-4 p-4 gap-2 grid  rounded-2xl  bg-white"
        >
          <h1 className="text-xl text-green-700 font-semibold mb-3">
            Pelanggaran Terbaru
          </h1>
          {AktivitasSementara.map(function (aktivitas) {
            return (
              <div className="flex items-center justify-start md:py-2 py-4 md:px-4 px-3 border border-red-600 rounded-2xl ">
                <CircleAlert className=" md:w-7 md:h-7 w-8 h-8 text-red-600 md:mr-4 mr-2" />
                <div className="flex md:flex-row flex-col justify-between w-full md:gap-0 gap-2">
                  <div className="flex flex-col md:gap-1 gap-1.5">
                    <h3 className="font-semibold">{aktivitas.title}</h3>
                    <p className=" text-xs font-medium text-red-600 uppercase">
                      {aktivitas.jenis}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {aktivitas.date}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
