import FormProfile from "@/components/OrangtuaComponent/FormUbahProfile/FormProfile";
import OrangtuaHeader from "@/components/views/Orangtua/OrangtuaHeader";

export default function EditProfil() {
  return (
    <>
      <div className="font-manrope pb-12 ">
        <OrangtuaHeader title={"Profil Akun"} />
        <FormProfile />
      </div>
    </>
  );
}
