/*eslint-disable */
import { CircleAlert, Edit3, Save, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { LabelDanInput, TitlePage } from "./ComponentForm";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { AlertTitle } from "@/components/ui/alert";

export default function FormProfile() {
  const { id } = useParams();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const profilImageDefault = "/profile-default.png";

  const [alert, setAlert] = useState(false);
  const [ubahProfile, setUbahProfile] = useState({
    username: "",
    full_name: "",
    mobile_phone: "",
    addres: "",
    description: "",
    profile_picture: "",
  });
  const [edit, setEdit] = useState(false);
  const inputRef = useRef();
  const [pathGambarLama, setPathGambarLama] = useState(null);

  // IMAGE STATES
  // profileImage = source-of-truth (dari DB)
  const [profileImage, setProfileImage] = useState(null);
  // previewImage = apa yg ditampilkan saat edit (bisa berupa profileImage atau URL.createObjectURL(file))
  const [previewImage, setPreviewImage] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);

  // ambil data user
  useEffect(() => {
    const getAkunOrangtua = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("profiles")
        .select(`*`)
        .eq("id", user.id)
        .single();
      if (error) {
        console.log(error);
      } else {
        setUbahProfile(data || {});
      }
    };
    getAkunOrangtua();
  }, [id]);

  // when ubahProfile loads, set profileImage and previewImage accordingly
  useEffect(() => {
    if (fileUpload) return;
    if (ubahProfile?.profile_picture) {
      setProfileImage(ubahProfile.profile_picture); // DB URL
      setPreviewImage(ubahProfile.profile_picture); // tampilkan sama dulu
      // parse path for deletion later (only if it's stored as supabase public url)
      try {
        const url = new URL(ubahProfile.profile_picture);
        const path = decodeURIComponent(
          url.pathname.split("/storage/v1/object/public/pesantren/")[1]
        );
        setPathGambarLama(path);
      } catch (err) {
        setPathGambarLama(null);
      }
    } else {
      // ke default jika tidak ada foto
      setProfileImage(profilImageDefault);
      setPreviewImage(profilImageDefault);
      setPathGambarLama(null);
    }
  }, [ubahProfile?.profile_picture, fileUpload]);

  // pilih file (belum mengganti profileImage)
  const changeImageProfile = (e) => {
    const file = e.target.files?.[0];
    if (file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      const imageURL = URL.createObjectURL(file);
      setFileUpload(file);
      setPreviewImage(imageURL); // preview sementara
      setAlert(false);
    } else {
      setAlert(true);
      // reset input
      inputRef.current.value = "";
      setTimeout(() => setAlert(false), 3000);
    }
  };

  // Save -> upload file, remove old, update DB
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (fileUpload) {
        const namaFile = `${Date.now()}-${fileUpload.name}`;
        const filePath = `images/avatar/${namaFile}`;

        // upload
        const { error: uploadError } = await supabase.storage
          .from("pesantren")
          .upload(filePath, fileUpload, { upsert: true });

        if (uploadError) {
          console.log("Upload gagal : ", uploadError.message);
          toast.error("Upload gambar gagal");
          return;
        }

        // public url
        const {
          data: { publicUrl },
        } = supabase.storage.from("pesantren").getPublicUrl(filePath);

        // delete old if exists and not default
        if (pathGambarLama && pathGambarLama !== filePath) {
          const { error: deleteError } = await supabase.storage
            .from("pesantren")
            .remove([pathGambarLama]);
          if (deleteError) {
            console.error("Gagal hapus gambar lama:", deleteError.message);
          }
        }

        // update DB: simpan public URL (atau path sesuai preferensi)
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { error: databaseError } = await supabase
          .from("profiles")
          .update({
            ...ubahProfile,
            profile_picture: publicUrl,
          })
          .eq("id", user.id);

        if (databaseError) {
          toast.error("Gagal Memperbarui Profil");
          return;
        }

        // sinkronisasi state: profileImage = publicUrl, previewImage = publicUrl, clear fileUpload
        setProfileImage(publicUrl);
        setPreviewImage(publicUrl);
        setFileUpload(null);
        // update ubahProfile so future cancels reflect DB
        setUbahProfile((prev) => ({ ...prev, profile_picture: publicUrl }));

        setEdit(false);
        toast.success("Profil diperbarui");
      } else {
        // jika tidak ada file baru, mungkin user cuma ubah teks -> lakukan update DB untuk ubahProfile
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { error: databaseError } = await supabase
          .from("profiles")
          .update({ ...ubahProfile })
          .eq("id", user.id);
        if (databaseError) {
          toast.error("Gagal memperbarui profil");
        } else {
          toast.success("Profil diperbarui");
          setEdit(false);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan");
    }
  };

  // Batal atau Reset ke state awal dari DB
  const HandleBatal = (e) => {
    e?.preventDefault();
    // tutup edit mode
    setEdit(!edit);
    // reset preview ke image dari DB (profileImage)
    setPreviewImage(profileImage || profilImageDefault);
    // clear file upload
    setFileUpload(null);
    // reset input file element
    if (inputRef.current) inputRef.current.value = "";
    // reset ubahProfile.profile_picture
    setUbahProfile((prev) => ({
      ...prev,
      profile_picture: profileImage || profilImageDefault,
    }));
  };

  // Set ke default (tombol "Default")
  const handleResetImage = async (e) => {
    e.preventDefault();
    setFileUpload(null);
    setPreviewImage(profilImageDefault);
    if (inputRef.current) inputRef.current.value = "";

    // optional: update DB to default (jika mau persist immediately)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error: databaseError } = await supabase
        .from("profiles")
        .update({ ...ubahProfile, profile_picture: profilImageDefault })
        .eq("id", user.id);

      if (databaseError) {
        toast.error("Gagal reset gambar ke default");
      } else {
        if (pathGambarLama) {
          await supabase.storage.from("pesantren").remove([pathGambarLama]);
        }
        setProfileImage(profilImageDefault);
        setUbahProfile((prev) => ({
          ...prev,
          profile_picture: profilImageDefault,
        }));
        toast.success("Foto profil direset ke default");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetAlert = (e) => {
    e?.preventDefault();
    setAlert(false);
  };

  return (
    <>
      <div className="md:mx-6 mx-4 my-3">
        <AnimatePresence>
          {alert && (
            <>
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ ease: "easeInOut" }}
                className="absolute bg-red-100 text-red-600 z-10 md:w-xl md:top-10 left-0 right-0 md:mx-auto mx-8 flex  px-4 py-4 justify-between items-center rounded-xl"
              >
                <div className="flex gap-4">
                  <CircleAlert />
                  <AlertTitle>Mohon pilih file yang sesuai</AlertTitle>
                </div>
                <button onClick={resetAlert}>
                  <X />
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <TitlePage title={"Edit Profil"} width={"w-48"} homeWidth={"w-1/4"} />

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="border border-green-700 w-[92%] rounded-4xl mx-auto mt-4 mb-24 md:py-0 md:px-0 py-8 px-4"
        >
          <div className="md:grid grid-col-3 ">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="md:col-start-1 row-start-1 col-span-1 row-span-3 flex flex-col justify-around items-center gap-4 md:py-12 py-6 md:bg-gradient-to-br from-emerald-500 to-teal-600 md:rounded-l-4xl"
            >
              <h3 className="md:text-green-100 text-green-700 font-semibold text-xl mx-auto mb-6">
                Ganti Foto Profil
              </h3>

              <div className="flex items-center overflow-hidden w-50 h-50 rounded-full mb-4">
                <img
                  src={
                    edit
                      ? previewImage || profileImage
                      : ubahProfile.profile_picture || profilImageDefault
                  }
                  alt="Foto Profil Akun Orangtua"
                  className="object-cover object-center w-full h-full"
                />
              </div>

              <div className="flex flex-col justify-center px-6 w-88">
                {edit ? (
                  <>
                    <Input
                      ref={inputRef}
                      id="profileImage"
                      accept=".jpg, .jpeg, .png"
                      type={"file"}
                      className="mx-auto font-semibold md:bg-green-100 text-green-700 cursor-pointer border md:border-green-100 border-green-700 file:cursor-pointer md:file:text-green-200 file:text-green-600 file:mr-4 rounded-full file:h-6.5 md:file:bg-green-600 file:bg-green-100 file:px-2 px-1 file:rounded-2xl"
                      onChange={changeImageProfile}
                    />
                    <button
                      onClick={handleResetImage}
                      className="md:text-yellow-300 text-red-500 font-semibold text-sm underline rounded-sm w-full mt-1 text-right pr-4 cursor-pointer"
                    >
                      Default
                    </button>
                  </>
                ) : (
                  ""
                )}
              </div>
            </motion.div>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={`md:col-start-2 row-start-1 col-span-2 row-span-3 flex flex-col justify-start my-8 px-4 md:px-8 md:mx-0 mx-auto md:pt-0 pt-6 md:border-t-0 border-t-2 border-green-700/60 gap-2`}
            >
              <div className="flex justify-between items-center md:mb-6 md:mt-0 my-4">
                <h3 className="text-green-700 text-xl  font-semibold">
                  Informasi Pribadi Orangtua
                </h3>
                <Button
                  className={` w-24 rounded-full text-md cursor-pointer flex gap-3 ${
                    edit
                      ? "bg-red-600 text-red-100 md:hover:bg-red-100 md:hover:text-red-600 hover:bg-red-600 hover:text-red-100"
                      : "bg-green-700 text-green-100 md:hover:bg-green-100 md:hover:text-green-700 hover:bg-green-700 hover:text-green-100"
                  }`}
                  onClick={HandleBatal}
                >
                  {edit ? <X /> : <Edit3 />}
                  {edit ? "Batal" : "Edit"}
                </Button>
              </div>
              <div className="flex w-full md:gap-8 gap-4">
                <LabelDanInput
                  value={ubahProfile.username}
                  label={"Nama Depan"}
                  type={"text"}
                  id={"namaDepan"}
                  name={"namaDepan"}
                  placeholder={"Contoh : Windah"}
                  styleLabel={"text-neutral-600 text-sm"}
                  disabled={!edit}
                  onChange={(e) =>
                    setUbahProfile({
                      ...ubahProfile,
                      username: e.target.value,
                    })
                  }
                  required
                />
                <LabelDanInput
                  value={ubahProfile.full_name}
                  label={"Nama Belakang"}
                  type={"text"}
                  id={"namaBelakang"}
                  name={"full_name"}
                  placeholder={"(opsional)"}
                  styleLabel={"text-neutral-600 text-sm"}
                  disabled={!edit}
                  onChange={(e) =>
                    setUbahProfile({
                      ...ubahProfile,
                      full_name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex md:flex-row flex-col mt-2 w-full md:gap-8 gap-4">
                <LabelDanInput
                  value={ubahProfile.mobile_phone}
                  label={"Nomor telepon"}
                  id={"nomorTelepon"}
                  name={"phone_number"}
                  placeholder={"097684367"}
                  styleLabel={"text-neutral-600 text-sm"}
                  disabled={!edit}
                  onChange={(e) =>
                    setUbahProfile({
                      ...ubahProfile,
                      mobile_phone: e.target.value,
                    })
                  }
                  required
                />
                <LabelDanInput
                  value={ubahProfile.addres}
                  label={"Alamat"}
                  type={"text"}
                  id={"alamat"}
                  name={"address"}
                  placeholder={"JL. Jendral Sudirman No. 10"}
                  styleLabel={"text-neutral-600 text-sm"}
                  disabled={!edit}
                  className={"w-full"}
                  onChange={(e) =>
                    setUbahProfile({
                      ...ubahProfile,
                      address: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="flex flex-col mt-2 w-full gap-1">
                <Label htmlFor="bio" className={"text-neutral-600 text-sm"}>
                  Bio
                </Label>
                <Textarea
                  value={ubahProfile.description}
                  onChange={(e) =>
                    setUbahProfile({
                      ...ubahProfile,
                      description: e.target.value,
                    })
                  }
                  placeholder="Type your bio here."
                  id="bio"
                  disabled={!edit}
                  className={
                    "resize-none border border-green-700 text-green-700 font-medium"
                  }
                />
              </div>
              {edit ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex gap-2 w-fit items-center px-12 bg-green-700 text-green-100  py-2 rounded-full mx-auto mt-6 cursor-pointer hover:scale-105 duration-300 ease-in-out disabled:bg-neutral-400 disabled:text-neutral-700 disabled:hover:scale-100 disabled:cursor-not-allowed"
                  >
                    <Save size={20} />
                    Simpan
                  </button>
                </>
              ) : (
                ""
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
