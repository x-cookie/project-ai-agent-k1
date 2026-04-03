"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLesson = pathname.startsWith("/learn/");

  return (
    <motion.div
      key={pathname}
      initial={isLesson
        ? { opacity: 0, scale: 0.96, filter: "blur(4px)" }
        : { opacity: 0, y: 14 }}
      animate={isLesson
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 1, y: 0 }}
      transition={{ duration: isLesson ? 0.4 : 0.3, ease: "easeOut" }}
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {children}
    </motion.div>
  );
}
