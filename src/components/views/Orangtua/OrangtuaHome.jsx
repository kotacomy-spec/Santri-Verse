import ThumbnailAnak from "@/components/layout/AnakLayout/Anak";
import TemplateAnak from "@/components/layout/AnakLayout/TemplateAnak";
import MenuOrangtua from "@/components/MenuOrangtua/MenuOrangtua";
import Berita from "@/components/OrangtuaComponent/Berita";
import PelanggaranTerbaru from "@/components/OrangtuaComponent/PelanggaranTerbaru";



export default function OrangtuaHome() {
  return (
    <>
      <div className="mx-8 my-4 gap-6 grid ">
        <Berita />
        <MenuOrangtua />
        <ThumbnailAnak />
        <TemplateAnak />
        <PelanggaranTerbaru />
      </div>
    </>
  );
}
