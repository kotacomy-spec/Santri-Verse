import { Star } from "lucide-react";

const dataSementara = [
  {
    id: 1,
    img: "/public/santri.jpg",
    nama: "Budi Setiawan",
    surat: "6 tahfidz - Al-Fatiha",
    pembimbing: "Raiden Shogun",
  },
];
// data sementara iki aku gaero soale😅

export default function Anak() {
  return (
    <>
      {dataSementara.map(function (data) {
        return (
          <>
            <div className="flex justify-between items-center px-6  mx-4 rounded-2xl bg-linear-to-r from-green-100 to-green-300 text-green-700 h-[100px]">
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
              <div className="flex items-center justify-center gap-2">
                <Star size={18} />
                <p>Prestasi Baik</p>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}
