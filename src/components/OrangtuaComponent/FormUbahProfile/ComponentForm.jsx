/* eslint-disable */
import { Link } from "react-router-dom";
import { Input } from "../../ui/input";
import { Label } from "@radix-ui/react-label";
import { House } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export function LabelDanInput({
  label,
  type,
  id,
  name,
  placeholder,
  required,
  onChange,
  className,
  styleLabel,
  value,
  disabled,
}) {
  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        <Label htmlFor={id} className={` ${styleLabel}`}>
          {label}
        </Label>
        <Input
          value={value}
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          disabled={disabled}
          className={` text-green-700  border-green-700 font-medium placeholder:font-normal placeholder:text-sm placeholder:text-gray-400 ${className}`}
        />
      </div>
    </>
  );
}

export function TitlePage({ title, width, homeWidth }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="flex items-center w-full my-6 relative md:px-10 px-4"
      >
        <Link to={"/orangtua"}>
          <ButtonHome title={title} width={width} homeWidth={homeWidth} />
        </Link>
      </motion.div>
    </>
  );
}

const ButtonHome = ({ title, width, homeWidth }) => {
  return (
    <>
      <button
        type="button"
        className={`bg-green-100 text-center ${width} rounded-full h-14 relative text-green-700 text-xl font-semibold border-4 border-white group`}
      >
        <div
          className={`bg-gradient-to-br from-emerald-500 to-teal-600 text-green-100 cursor-pointer rounded-full h-12 ${homeWidth} grid place-items-center absolute left-0 top-0 group-hover:w-full z-10 duration-500`}
        >
          <House />
        </div>
        <p className="translate-x-4 flex justify-center items-center">
          {title}
        </p>
      </button>
    </>
  );
};

export default { LabelDanInput, TitlePage };
