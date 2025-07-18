import NavbarOrangtua from "@/components/NavbarOrangtua/NavbarOrangtua";
import OrangtuaHeader from "@/components/OrangtuaComponent/OrangtuaHeader";
import OrangtuaHome from "@/components/OrangtuaComponent/OrangtuaHome";

export default function OrangtuaPage() {
  return (
    <>
      <div className="font-manrope">
        <OrangtuaHeader />
        <OrangtuaHome />
        <NavbarOrangtua />
      </div>
    </>
  );
}
