import FormUbahPassword from "@/components/OrangtuaComponent/FormUbahProfile/FormUbahPassword";
import OrangtuaHeader from "@/components/views/Orangtua/OrangtuaHeader";

export default function UbahPassword() {
  return (
    <>
      <div className="font-manrope">
        <OrangtuaHeader title={"Ubah Kata Sandi"} />
        <FormUbahPassword/>
      </div>
    </>
  );
}
