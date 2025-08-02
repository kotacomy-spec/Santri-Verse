/* eslint-disable */
import { AlarmClock, CheckCheck } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { motion } from "framer-motion";
import { useState } from "react";

const dataNotifSementara = [
  {
    id: 1,
    icon: <AlarmClock size={18} />,
    title: "Update",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint non aliquid numquam unde. Quis doloremque, odit eum corrupti sint dolorem.",
    time: "04.00 PM",
  },
  {
    id: 2,
    icon: <AlarmClock size={18} />,
    title: "Update",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint non aliquid numquam unde. Quis doloremque, odit eum corrupti sint dolorem.",
    time: "04.00 PM",
  },
  {
    id: 3,
    icon: <AlarmClock size={18} />,
    title: "Update",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint non aliquid numquam unde. Quis doloremque, odit eum corrupti sint dolorem.",
    time: "04.00 PM",
  },
  {
    id: 4,
    icon: <AlarmClock size={18} />,
    title: "Update",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint non aliquid numquam unde. Quis doloremque, odit eum corrupti sint dolorem.",
    time: "04.00 PM",
  },
  {
    id: 5,
    icon: <AlarmClock size={18} />,
    title: "Update",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint non aliquid numquam unde. Quis doloremque, odit eum corrupti sint dolorem.",
    time: "04.00 PM",
  },
  {
    id: 6,
    icon: <AlarmClock size={18} />,
    title: "Update",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint non aliquid numquam unde. Quis doloremque, odit eum corrupti sint dolorem.",
    time: "04.00 PM",
  },
];

export default function Notification() {
  const [showAll, setShowAll] = useState(false);
  const [bacaSemua, setBacaSemua] = useState([
    "bg-green-100 m-2 rounded-md",
    "font-semibold",
  ]);

  return (
    <>
      <Card className={"md:w-[40vw] gap-0 pb-0"}>
        <CardHeader
          className={"border-b-[1.5px] pb-3 justify-center items-center"}
        >
          <CardTitle>Notifikasi</CardTitle>
          <CardAction
            onClick={() =>
              setBacaSemua(["bg-white border-b-[1.5px]", "font-medium"])
            }
            className={
              "flex gap-1 items-center text-sm text-green-700 cursor-pointer"
            }
          >
            {/* <CheckCheck size={18} /> Baca Semua */}
          </CardAction>
        </CardHeader>
        <CardContent className={"px-0 my-0"}>
          {dataNotifSementara
            .slice(0, showAll ? dataNotifSementara.length : 3)
            .map(function (data) {
              return (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  key={data.id}
                  className={`group flex justify-center items-center gap-x-4  px-6 py-4 cursor-pointer bg-green-100 hover:bg-white ${bacaSemua[0]}`}
                >
                  <div className="group-hover:bg-green-100 border border-green-700/50 w-fit h-fit bg-white text-green-700 p-2 rounded-full duration-300 ease-in-out">
                    {data.icon}
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <div className="flex justify-between text-sm">
                      <h3 className={`${bacaSemua[1]} text-sm`}>
                        {data.title}
                      </h3>
                      <span className="font-semibold  text-green-700">
                        {data.time}
                      </span>
                    </div>
                    <p className="text-xs">{data.desc}</p>
                  </div>
                </motion.div>
              );
            })}
        </CardContent>
        <CardFooter className={"py-3"}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-neutral-600 cursor-pointer"
          >
            {showAll ? "Sembunyikan" : "Lihat Semua"} Notifikasi
          </button>
        </CardFooter>
      </Card>
    </>
  );
}
