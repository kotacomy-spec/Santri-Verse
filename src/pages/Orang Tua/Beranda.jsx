import OrangtuaHeader from "@/components/views/Orangtua/OrangtuaHeader";
import OrangtuaHome from "@/components/views/Orangtua/OrangtuaHome";

export default function OrangtuaPage() {
  return (
    <>
      <div className="font-manrope pb-12 overflow-x-hidden">
        <OrangtuaHeader title={"Monitoring Santri"} />
        <OrangtuaHome />
      </div>
    </>
  );
}
