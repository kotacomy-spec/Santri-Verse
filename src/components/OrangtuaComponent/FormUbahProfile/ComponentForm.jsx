/* eslint-disable */
import { Link } from "react-router-dom";
import { Input } from "../../ui/input";
import { Label } from "@radix-ui/react-label";
import { House } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

export function TitlePage({ title, icon, className }) {
    const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0,x:-40 }}
        animate={isInView ? { opacity: 1,x:0 } : {}}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="flex items-center w-full"
      >
        <Link
          to={"/orangtua/dashboard"}
          className="text-green-100 ml-6 mr-3 my-2 bg-green-700 rounded-full p-2"
        >
          <House />
        </Link>
        <h1
          className={`text-green-700 font-semibold md:text-xl   rounded-2xl px-2.5 py-0.5 flex items-center  gap-2 ${className}`}
        >
          {icon}
          {title}
        </h1>
      </motion.div>
    </>
  );
}

export default { LabelDanInput, TitlePage };
