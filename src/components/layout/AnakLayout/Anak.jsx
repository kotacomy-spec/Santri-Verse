/* eslint-disable */
import { ChevronDown, Star, TriangleAlert } from "lucide-react";
import { dataSementara } from "./dataSementaraAnak";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { PelanggaranAnakBanyak } from "@/components/OrangtuaComponent/PelanggaranTerbaru";
import { useState, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

export default function Anak() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <>
      {dataSementara.map(function (data) {
        return (
          <>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div
                className={`flex justify-between items-center px-6  md:mx-16 rounded-2xl bg-linear-to-r from-green-100 to-green-300 text-green-700 h-[100px]`}
              >
                <div className="flex w-fit">
                  <div
                    className=" mr-4 p-4 rounded-full border-[1.5px] border-green-700 bg-cover bg-center w-14 h-14"
                    style={{ backgroundImage: `url(${data.img})` }}
                  ></div>
                  <div className="flex flex-col justify-center">
                    <h1 className="font-bold">{data.nama}</h1>
                    <p className="text-sm">{data.surat}</p>
                    <p className="text-xs">{data.pembimbing}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 ">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  >
                    <Star size={18} />
                  </motion.div>
                  <p>Aktif</p>
                </div>
              </div>
            </motion.div>
          </>
        );
      })}
    </>
  );
}

export function AnakLebih() {
  const [isOpen, setIsOpen] = useState(null);

  const toggleDown = (id) => {
    setIsOpen(isOpen === id ? null : id);
  };
  const ref = useRef(null);
  const isInView = useInView(ref);
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`grid grid-col-3  gap-8 md:w-[70%] w-full mx-auto`}
      >
        {dataSementara.map(function (data) {
          return (
            <>
              <AnimatePresence>
                <motion.div
                  key={data.id}
                  variants={itemVariants}
                  className={`flex flex-col w-full justify-between gap-4 items-center md:px-8 px-6 py-6  rounded-4xl bg-green-100 border border-green-700  text-green-700 h-fit`}
                >
                  <div className="flex justify-between items-center w-full h-full">
                    <div className="flex w-fit items-center">
                      <div
                        className=" mr-4 p-4 rounded-full border-[1.5px] border-green-700 bg-cover bg-center w-14 h-14"
                        style={{ backgroundImage: `url(${data.img})` }}
                      ></div>
                      <div className="flex flex-col justify-center gap-1">
                        <h1 className="font-bold">{data.nama}</h1>
                        <p className="text-sm">{data.surat}</p>
                        <p className="text-xs">{data.pembimbing}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 bg-green-700 text-green-100 rounded-full  px-4 py-1">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                      >
                        <Star size={18} />
                      </motion.div>
                      <p>Aktif</p>
                    </div>
                  </div>
                  <Collapsible className="flex flex-col justify-center items-center w-full ">
                    <CollapsibleTrigger
                      onClick={() => toggleDown(data.id)}
                      className="flex gap-1 items-center justify-between w-full font-medium text-orange-600 bg-orange-100 border border-orange-600 rounded-sm px-8 py-2 hover:cursor-pointer"
                    >
                      <p className="flex gap-2 justify-center text-sm items-center">
                        <TriangleAlert size={17} />
                        Lihat {dataSementara.length} Pelanggaran
                      </p>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-sm bg-orange-600 rounded-full text-white w-5">
                          {dataSementara.length}
                        </span>
                        <ChevronDown
                          className={`${
                            isOpen === data.id
                              ? "rotate-180 transition-all duration-300 ease-in-out"
                              : "transition-all duration-300 ease-in-out"
                          }`}
                          size={22}
                        />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="w-full">
                      <PelanggaranAnakBanyak />
                    </CollapsibleContent>
                  </Collapsible>
                </motion.div>
              </AnimatePresence>
            </>
          );
        })}
      </motion.div>
    </>
  );
}
