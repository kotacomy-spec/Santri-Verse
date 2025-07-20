import { SquareArrowOutUpRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
// import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from "embla-carousel-autoplay";
import React from "react";

const beritaSementara = [
  {
    id: 1,
    image: "url('/public/berita.jpg')",
    title: "Siswa Lahir di Ohio",
    waktu: "Rabu, 9 Juni 2025",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio obcaecati beatae provident quam veritatis laudantium deleniti doloribus quaerat doloremque. Recusandae!",
  },
  {
    id: 2,
    image: "url('/public/berita.jpg')",
    title: "Santri Ini Menang Melawan Thanos",
    waktu: "Sabtu, 18 Maret 2098",
    deskripsi:
      "lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio obcaecati beatae provident quam veritatis laudantium deleniti doloribus quaerat doloremque. Recusandae! consectetur adipisicing elit. Odio obcaecati beatae provident quam veritatis",
  },
  {
    id: 3,
    image: "url('/public/berita.jpg')",
    title: "Puluhan Santri di PHK ",
    waktu: "Senin, 29 Agustus 1930",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio obcaecati beatae provident quam veritatis laudantium ",
  },
  {
    id: 4,
    image: "url('/public/berita.jpg')",
    title: "Beasiswa Kuliah di Jepang",
    waktu: "Selasa, 1 Desember 2045",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio obcaecati beatae provident quam veritatis laudantium deleniti doloribus quaerat doloremque. Recusandae! deleniti doloribus quaerat doloremque. Recusandae!",
  },
  {
    id: 5,
    image: "url('/public/berita.jpg')",
    title: "Santri Menciptakan Bom Dari Kertas Ujian",
    waktu: "Jum'at, 10 Mei 2003",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio obcaecati beatae provident quam veritatis laudantium deleniti doloribus quaerat doloremque. Recusandae! deleniti doloribus quaerat doloremque. Recusandae! deleniti doloribus quaerat doloremque. Recusandae!",
  },
];

export default function Berita() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <>
      <div className="md:mx-8 mx-auto my-6">
        <Carousel plugins={[plugin.current]}>
          <CarouselContent className={"w-[90vw]"}>
            {beritaSementara.map(function (berita) {
              return (
                <CarouselItem
                  key={berita.id}
                  className={"md:h-[470px] h-[30vh] "}
                >
                  <div className="relative rounded-2xl  h-full  bg-cover group overflow-hidden bg-center bg-no-repeat flex  items-end justify-center ">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `${berita.image}` }}
                    ></div>

                    <div className="relative z-10 flex justify-between items-center md:w-[88%] w-full md:h-fit h-[35%] bg-white/90    md:rounded-t-2xl py-5 md:px-16 px-4">
                      <div className="flex flex-col md:w-3/4 w-3/5 gap-2 text-green-700 ">
                        <h1 className="font-semibold md:text-xl text-[1rem] ">
                          {berita.title}
                        </h1>
                        <p className="text-sm text-balance font-normal md:flex hidden">
                          {berita.deskripsi}
                        </p>
                        <span className="text-xs font-medium text-gray-700">
                          {berita.waktu}
                        </span>
                      </div>
                      <a
                        href=""
                        className="text-blue-500 md:w-fit flex items-center justify-center gap-2"
                      >
                        <p className="font-semibold underline md:text-[1rem] text-sm">
                          Detail Berita
                        </p>
                        <SquareArrowOutUpRight size={17} />
                      </a>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className={"md:left-5 md:flex hidden hover:cursor-pointer"} />
          <CarouselNext className={"md:right-5 md:flex hidden hover:cursor-pointer"} />
        </Carousel>
      </div>
    </>
  );
}

// import { useEffect, useRef, useState } from 'react';

// export default function Berita() {
//   const [api, setApi] = useState(null);
//   const [current, setCurrent] = useState(0);
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (!api) return;

//     setCount(api.scrollSnapList().length);
//     setCurrent(api.selectedScrollSnap() + 1);

//     // Auto scroll function
//     const autoScroll = setInterval(() => {
//       if (api.canScrollNext()) {
//         api.scrollNext();
//       } else {
//         api.scrollTo(0); // Kembali ke slide pertama
//       }
//     }, 3000); // Auto scroll setiap 3 detik

//     // Update current slide saat berubah
//     api.on('select', () => {
//       setCurrent(api.selectedScrollSnap() + 1);
//     });

//     // Cleanup interval
//     return () => clearInterval(autoScroll);
//   }, [api]);

//   // Pause auto scroll saat hover
//   const handleMouseEnter = () => {
//     if (api) api.destroy();
//   };

//   const handleMouseLeave = () => {
//     if (api) {
//       // Restart auto scroll
//       const autoScroll = setInterval(() => {
//         if (api.canScrollNext()) {
//           api.scrollNext();
//         } else {
//           api.scrollTo(0);
//         }
//       }, 3000);
//     }
//   };

//   return (
//     <>
//       <div className="mx-8 my-6">
//         <Carousel
//           setApi={setApi}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//           opts={{
//             align: "start",
//             loop: true,
//           }}
//         >
//           <CarouselContent>
//             {beritaSementara.map(function (berita) {
//               return (
//                 <CarouselItem
//                   key={berita.id}
//                   className={"h-[470px] w-[100px]"}
//                 >
//                   <div className="relative rounded-2xl h-full bg-cover group overflow-hidden bg-center bg-no-repeat flex items-end justify-center">
//                     <div
//                       className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
//                       style={{ backgroundImage: `${berita.image}` }}
//                     ></div>

//                     <div className="relative z-10 flex justify-between items-center w-[88%] h-fit bg-white/90 rounded-t-2xl py-5 px-16">
//                       <div className="flex flex-col w-3/4 gap-2 text-green-700">
//                         <h1 className="font-semibold text-xl">
//                           {berita.title}
//                         </h1>
//                         <p className="text-sm text-balance font-normal">
//                           {berita.deskripsi}
//                         </p>
//                         <span className="text-xs font-medium text-gray-700">
//                           {berita.waktu}
//                         </span>
//                       </div>
//                       <a
//                         href=""
//                         className="text-green-700 font-semibold underline flex items-center gap-2"
//                       >
//                         <p>Baca Selengkapnya</p>
//                         <SquareArrowOutUpRight size={18} />
//                       </a>
//                     </div>
//                   </div>
//                 </CarouselItem>
//               );
//             })}
//           </CarouselContent>
//           <CarouselPrevious className={"left-5"} />
//           <CarouselNext className={"right-5"} />
//         </Carousel>
//       </div>
//     </>
//   );
// }
