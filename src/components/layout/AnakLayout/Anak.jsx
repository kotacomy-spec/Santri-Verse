import { ChevronDown, Star, TriangleAlert } from "lucide-react";
import { dataSementara } from "./dataSementaraAnak";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { PelanggaranAnakBanyak } from "@/components/OrangtuaComponent/PelanggaranTerbaru";
import { useState } from "react";

function dataAnakHandler(jumlah, visibilitasSatu, visibilitasDua) {
  if (dataSementara.length >= jumlah || dataSementara.length === 0) {
    return visibilitasSatu;
  } else {
    return visibilitasDua;
  }
}

export default function Anak() {
  return (
    <>
      {dataSementara.map(function (data) {
        return (
          <>
            <div
              className={`${dataAnakHandler(
                2,
                "hidden",
                "flex"
              )} justify-between items-center px-6  md:mx-4 rounded-2xl bg-linear-to-r from-green-100 to-green-300 text-green-700 h-[100px]`}
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
                <Star size={18} />
                <p>Aktif</p>
              </div>
            </div>
          </>
        );
      })}
      <AnakLebih />
    </>
  );
}

export function AnakLebih() {
  const [isOpen, setIsOpen] = useState(null);

  const toggleDown = (id) => {
    setIsOpen(isOpen === id ? null : id);
    console.log(isOpen);
    console.log(id);
    console.log(setIsOpen);
  };

  return (
    <>
      <div
        className={`${dataAnakHandler(
          2,
          "flex",
          "hidden"
        )} flex-col gap-8 md:w-[85%] w-full mx-auto`}
      >
        {/* <h1>halo</h1> */}
        {dataSementara.map(function (data) {
          return (
            <>
              <div
                key={data.id}
                className={`${dataAnakHandler(
                  2,
                  "flex flex-col",
                  "hidden"
                )} justify-between gap-4 items-center md:px-8 px-4 py-6  rounded-2xl bg-white border border-green-700 shadow-lg text-green-700 h-fit`}
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
                  <div className="flex items-center justify-center gap-2 bg-green-100 rounded-full  px-4 py-1">
                    <Star size={18} />
                    <p>Aktif</p>
                  </div>
                </div>
                <Collapsible className="flex flex-col justify-center items-center w-full ">
                  <CollapsibleTrigger
                    onClick={() => toggleDown(data.id)}
                    className="flex gap-1 items-center justify-between w-full font-medium text-red-600 bg-red-100 border border-red-600 rounded-sm px-8 py-2 "
                  >
                    <p className="flex gap-2 justify-center text-sm items-center">
                      <TriangleAlert size={17} />
                      Lihat {dataSementara.length} Pelanggaran
                    </p>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-sm bg-red-600 rounded-full text-white w-5">{dataSementara.length}</span>
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
              </div>
              
            </>
          );
        })}
      </div>
    </>
  );
}
