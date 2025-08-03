/* eslint-disable */
import { useRef, useState } from "react";
import { LabelDanInput, TitlePage } from "./ComponentForm";
import {
  CircleAlert,
  Eye,
  EyeOff,
  Lock,
  Save,
  ShieldCheck,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { AlertTitle } from "@/components/ui/alert";

export default function FormUbahPassword() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [passwordSama, setPasswordSama] = useState("");
  const [melihatPasswordLama, setMeliatPasswordLama] = useState(false);
  const [melihatPasswordBaru, setMeliatPasswordBaru] = useState(false);
  const [melihatPasswordSama, setMeliatPasswordSama] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [alertIcon, setAlertIcon] = useState("");

  const toggleView = (id) => {
    if (id === "passwordLama") {
      setMeliatPasswordLama(!melihatPasswordLama);
    } else if (id === "passwordBaru") {
      setMeliatPasswordBaru(!melihatPasswordBaru);
    } else if (id === "passwordSama") {
      setMeliatPasswordSama(!melihatPasswordSama);
    }
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    let alertMessage = "";
    if (passwordLama === passwordBaru) {
      alertMessage = "Kata sandi baru tidak boleh sama dengan kata sandi lama";
      setAlertColor("red");
      setAlertIcon(<CircleAlert />);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else if (passwordBaru !== passwordSama) {
      alertMessage = "Mohon konfirmasi kata sandi dengan benar";
      setAlertColor("red");
      setAlertIcon(<CircleAlert />);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else if (
      passwordLama.length <= 7 ||
      passwordBaru.length <= 7 ||
      passwordSama.length <= 7
    ) {
      alertMessage = "Kata sandi tidak boleh kurang dari 8 karakter";
      setAlertColor("red");
      setAlertIcon(<CircleAlert />);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {
      alertMessage = "Berhasil mengubah kata sandi";
      setAlertColor("green");
      setAlertIcon(<ShieldCheck />);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
    setAlertMessage(alertMessage);
  };

  const memasukkanPassword = [
    function (e) {
      setPasswordLama(e.target.value);
    },
    function (e) {
      setPasswordBaru(e.target.value);
    },
    function (e) {
      setPasswordSama(e.target.value);
    },
  ];

  const styleLabel = "text-green-700 text-md font-semibold";

  return (
    <>
      <div className="md:mx-6 mx-4 pb-16 md:mt-3 mb-20 my-6">
        <AnimatePresence>
          {alert && (
            <>
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ ease: "linear" }}
                className={`absolute bg-${alertColor}-100 text-${alertColor}-600 z-10 md:w-xl md:top-10 left-0 right-0 md:mx-auto mx-4 flex  px-4 py-4 justify-between items-center rounded-xl`}
              >
                <div className="flex gap-4">
                  {alertIcon}
                  <AlertTitle>{alertMessage}</AlertTitle>
                </div>
                <button onClick={() => setAlert(false)}>
                  <X />
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <TitlePage
          className={
            "md:text-center w-fit flex justify-center  mx-auto md:text-xl text-md"
          }
          title={
            // " Gunakan kombinasi kata sandi yang kuat untuk melindungi informasi Anda."
            "Password"
          }
          icon={<Lock size={20} className="hidden md:flex" />}
        />
        <motion.form
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeInOut" }}
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-4 md:w-[75%] w-full md:py-12 py-2 md:px-4 px-2 mt-10 mx-auto rounded-3xl  md:shadow-[0_4px_8px] shadow-green-700/30"
        >
          <div className="flex w-full px-8 relative">
            <LabelDanInput
              label={"Kata Sandi Lama"}
              type={melihatPasswordLama ? "text" : "password"}
              id={"passwordLama"}
              placeholder={"*******"}
              required={true}
              onChange={memasukkanPassword[0]}
              styleLabel={styleLabel}
            />
            <button
              className="absolute  right-12 top-9 text-lg text-green-700 hover:cursor-pointer"
              type="button"
              onClick={() => toggleView("passwordLama")}
            >
              {melihatPasswordLama ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="flex md:flex-row flex-col gap-8 w-full px-8 py-4">
            <div className="relative w-full">
              <LabelDanInput
                label={"Kata Sandi Baru"}
                type={melihatPasswordBaru ? "text" : "password"}
                id={"passwordBaru"}
                placeholder={"AkunAman1234"}
                required={true}
                onChange={memasukkanPassword[1]}
                styleLabel={styleLabel}
              />
              <button
                className="absolute right-4 top-9 text-lg text-green-700 hover:cursor-pointer "
                type="button"
                onClick={() => toggleView("passwordBaru")}
              >
                {melihatPasswordBaru ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="relative w-full">
              <LabelDanInput
                label={"Konfirmasi Kata Sandi Baru"}
                type={melihatPasswordSama ? "text" : "password"}
                id={"passwordSama"}
                placeholder={"AkunAman1234"}
                required={true}
                onChange={memasukkanPassword[2]}
                styleLabel={styleLabel}
              />
              <button
                className="absolute right-4 top-9 text-lg text-green-700 hover:cursor-pointer"
                type="button"
                onClick={() => toggleView("passwordSama")}
              >
                {melihatPasswordSama ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            type="submit"
            className="flex gap-2 justify-center items-center bg-green-700 text-green-100 text-lg font-medium px-12 py-2 mt-10 rounded-full cursor-pointer"
          >
            <Save size={20} />
            Simpan
          </motion.button>
        </motion.form>
      </div>
    </>
  );
}
