/*eslint-disable */
import { CircleAlert, Save, X } from "lucide-react";
import { useRef, useState } from "react";
import { AlertTitle } from "../../ui/alert";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { LabelDanInput, TitlePage } from "./ComponentForm";
import { Label } from "recharts";
import { Input } from "@/components/ui/input";

export default function FormProfile() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const profilImageDefault = "/profile-default.png";
  const [profileImage, setProfileImage] = useState(profilImageDefault);
  const [alert, setAlert] = useState(false);
  const inputRef = useRef();

  const handleChangeProfile = function (e) {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
      setAlert(false);
    } else {
      setAlert(true);
      setProfileImage(profilImageDefault);
      inputRef.current.value = "";

      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };

  const handleReset = function (e) {
    e.preventDefault();
    setProfileImage(profilImageDefault);
    setAlert(false);
    inputRef.current.value = "";
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
                <button onClick={handleReset}>
                  <X />
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <TitlePage title={"Edit Profil"} className={"text-xl"} />
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="md:shadow-[0_7px_15px_2px] md:shadow-green-700/20 w-[92%] rounded-4xl mx-auto mt-4 py-8 px-2"
        >
          <form>
            <div className="md:grid grid-col-3 ">
              <motion.div
                ref={ref}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="md:col-start-1 row-start-1 col-span-1 row-span-3 flex flex-col justify-around items-center gap-4  py-6 "
              >
                <h3 className="text-green-700 font-semibold text-lg mx-auto mb-1">
                  Ganti Foto Profil
                </h3>
                <div className="overflow-hidden w-50 h-50 rounded-full border-2 border-green-700/50">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt=""
                      className="object-cover object-center w-full h-full"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col justify-center ">
                  <Label
                    htmlFor="profileImage"
                    className="text-sm text-gray-400 font-semibold mb-1"
                  >
                    Pilih Foto
                  </Label>
                  <Input
                    ref={inputRef}
                    id="profileImage"
                    accept=".jpg, .jpeg, .png"
                    type={"file"}
                    className={
                      "mx-auto font-semibold text-green-700 border border-green-500 file:text-green-500 file:mr-4 rounded-full file:h-6.5  file:bg-green-200 file:px-2 px-1 file:rounded-2xl "
                    }
                    onChange={handleChangeProfile}
                  ></Input>
                  <button
                    onClick={handleReset}
                    className="text-red-500 font-semibold text-sm underline rounded-sm  w-full mt-1 text-right pr-4"
                  >
                    Hapus
                  </button>
                </div>
              </motion.div>
              <motion.div
                ref={ref}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className=" md:col-start-2 row-start-1 col-span-2 row-span-3 flex flex-col gap-2 justify-center  md:pr-10 md:mx-0 mx-auto"
              >
                <h3 className="text-green-700 text-lg font-semibold">
                  Informasi Pribadi Orangtua
                </h3>
                <div className="flex  mt-2 w-full  md:gap-8 gap-4">
                  <LabelDanInput
                    label={"Nama Depan"}
                    type={"text"}
                    id={"namaDepan"}
                    placeholder={"Contoh : Windah"}
                    styleLabel={"text-neutral-600 text-sm"}
                    required
                  />
                  <LabelDanInput
                    label={"Nama Belakang"}
                    type={"text"}
                    id={"namaBelakang"}
                    placeholder={"(opsional)"}
                    styleLabel={"text-neutral-600 text-sm"}
                  />
                </div>
                <div className="flex md:flex-row flex-col mt-2 w-full md:gap-8 gap-4">
                  <LabelDanInput
                    label={"Email"}
                    type={"email"}
                    id={"email"}
                    placeholder={"andrlzrd@gmail.com"}
                    styleLabel={"text-neutral-600 text-sm"}
                    required
                  />
                  <LabelDanInput
                    label={"Nomor Telepon"}
                    type={"number"}
                    id={"nomorTelepon"}
                    placeholder={"0826863892"}
                    styleLabel={"text-neutral-600 text-sm"}
                    required
                  />
                </div>
                <div className="flex mt-2 w-full">
                  <LabelDanInput
                    label={"Alamat"}
                    type={"text"}
                    id={"alamat"}
                    placeholder={"JL. Jendral Sudirman No. 10"}
                    styleLabel={"text-neutral-600 text-sm"}
                    required
                    className={"w-full"}
                  />
                </div>
                <AnimatePresence>
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    type="submit"
                    className="  flex gap-2 w-fit items-center px-12 bg-green-700 text-green-100  py-2 rounded-full mx-auto mt-4"
                  >
                    <Save size={20} />
                    Simpan
                  </motion.button>
                </AnimatePresence>
              </motion.div>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}
