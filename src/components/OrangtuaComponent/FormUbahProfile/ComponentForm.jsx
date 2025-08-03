/* eslint-disable */
import { Link } from "react-router-dom";
import { Input } from "../../ui/input";
import { Label } from "@radix-ui/react-label";
import { Home, House } from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export function LabelDanInput({
  label,
  type,
  id,
  placeholder,
  required,
  onChange,
  className,
  styleLabel,
}) {
  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        <Label htmlFor={id} className={` ${styleLabel}`}>
          {label}
        </Label>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          className={` text-green-700  border-green-700 placeholder:font-normal placeholder:text-sm placeholder:text-gray-400 ${className}`}
        />
      </div>
    </>
  );
}

export function TitlePage({ title }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="flex items-center w-full my-6 relative px-10"
      >
        <Link to={"/orangtua"} >
        <ButtonHome title={title} />
        </Link>
        {/* <div className="flex items-center w-42 h-12 bg-green-100 rounded-full pr-2 ml-12">
          <AnimatePresence>
            <motion.div
              onHoverStart={() => {
                setHovered(true), console.log(hovered);
              }}
              onHoverEnd={() => {
                setHovered(false), console.log(hovered);
              }}
              className={`${hovered?"w-40":""} flex items-center text-green-100 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full p-3 `}
            >
              <Link to={"/orangtua/dashboard"}>
                <House />
              </Link>
            </motion.div>
            <motion.h1
              className={` text-green-700 font-semibold md:text-lg rounded-2xl px-2.5 py-0.5 flex items-center gap-2 ml-2  ${className}`}
            >
              {icon}
              {title}
            </motion.h1>
          </AnimatePresence>
        </div> */}

        {/* <div className="flex items-center w-42 h-12 bg-green-100 rounded-full pr-2 ml-12">
          <motion.div
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            initial={{ width: "auto" }}
            animate={{ width: hovered ? "100%" : "30%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex items-center text-green-100 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full p-3"
          >
            <Link to={"/orangtua/dashboard"}>
              <House />
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 1, x: 0, position: "relative" }}
            animate={{
              opacity: hovered ? 0 : 1,
              x: hovered ? -20 : 0,
              position: "relative",
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`text-green-700 font-semibold md:text-lg rounded-2xl px-2.5 py-0.5 flex items-center gap-2 ml-2 ${className}`}
          >
            {icon}
            {title}
          </motion.h1>
        </div> */}
      </motion.div>
    </>
  );
}

function ButtonBaru({ title, icon, className, width }) {
  return (
    <button
      className={`group relative flex h-10 ${width} items-center cursor-pointer overflow-hidden rounded-full border border-white/30 bg-green-100 transition-transform duration-300 active:scale-95`}
    >
      <span
        className={`z-10 flex h-8 w-8 mx-1 items-center justify-center rounded-full text-green-100 bg-gradient-to-br from-emerald-500 to-teal-600 transition-all duration-300 group-hover:${width}`}
      >
        <Home />
      </span>
      <p
        className={`flex absolute right-5 z-0 text-green-700 transition-all duration-300 group-hover:translate-x-2 group-hover:w-0 group-hover:text-[0px] ${className}`}
      >
        {icon}
        {title}
      </p>
    </button>
  );
}

import React from "react";

const ButtonHome = ({ title }) => {
  return (
    <>
      <button
        type="button"
        className="bg-green-100 text-center w-48 rounded-full h-14 relative text-green-700 text-xl font-semibold border-4 border-white group"
      >
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-green-100 cursor-pointer rounded-full h-12 w-1/4 grid place-items-center absolute left-0 top-0 group-hover:w-full z-10 duration-500">
          <Home />
        </div>
        <p className="translate-x-4 flex justify-center items-center">
          {title}
        </p>
      </button>
    </>
  );
};

export default { LabelDanInput, TitlePage };
