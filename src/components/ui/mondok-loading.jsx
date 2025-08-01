/* eslint-disable */
import { BookOpenText } from "lucide-react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -10 },
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const iconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="flex flex-col items-center">
          <motion.div
            className="w-25 h-25 mb-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center"
            variants={iconVariants}
            initial="initial"
            animate="animate"
          >
            <BookOpenText className="w-14 h-14 text-white" />
          </motion.div>
          <div className="flex space-x-2 mt-6">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 bg-emerald-500 rounded-full"
                variants={dotVariants}
                initial="initial"
                animate="animate"
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default LoadingScreen;
