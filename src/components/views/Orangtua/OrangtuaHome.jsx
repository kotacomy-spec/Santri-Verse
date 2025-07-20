import Anak, { AnakLebih } from "@/components/layout/AnakLayout/Anak";
import { dataSementara } from "@/components/layout/AnakLayout/dataSementaraAnak";
import MenuOrangtua from "@/components/MenuOrangtua/MenuOrangtua";
import Berita from "@/components/OrangtuaComponent/Berita";
import PelanggaranTerbaru from "@/components/OrangtuaComponent/PelanggaranTerbaru";

export default function OrangtuaHome() {
  return (
    <>
      <div className="mx-8 my-4 gap-6 grid">
        <Berita />
        <MenuOrangtua />
        {dataSementara.length > 1 ? <AnakLebih /> : <Anak />}
        <PelanggaranTerbaru />
      </div>
    </>
  );
}
