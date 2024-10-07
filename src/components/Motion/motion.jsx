"use client";

import { motion, AnimatePresence } from "framer-motion";

const Motion = ({ children, y = 6, duration = 0.3 }) => {
  return (
    <AnimatePresence mode="sync">
      <motion.div
        initial={{ opacity: 0, y }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Motion;
