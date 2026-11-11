"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";

const ScrollBar = () => {
  const { scrollYProgress } = useScroll();
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [circumference, 0]
  );

  const [showScroll, setShowScroll] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      className="fixed bottom-0 right-2 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: showScroll ? 1 : 0, scale: showScroll ? 1 : 0 }}
      transition={{ duration: 0.3 }}>
      <div className="relative w-[100px] h-[100px]">
        <svg width="100" height="100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#fff2bd"
            strokeWidth="3"
            fill="transparent"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#fdd835"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={circumference}
            style={{ strokeDashoffset }}
          />
        </svg>

        <button
          onClick={scrollToTop}
          className="absolute inset-0 flex items-center justify-center cursor-pointer">
          <FaLongArrowAltUp className="text-brand-gold text-xl" />
        </button>
      </div>
    </motion.div>
  );
};

export default ScrollBar;
