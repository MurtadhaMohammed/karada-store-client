"use client";

import { motion } from "framer-motion";

const Drawer = ({
  children, // Content of the drawer
  isOpen, // Controls whether the drawer is open
  onClose, // Function to handle closing the drawer
  position = "left", // "left" or "right"
  width = 300, // Width of the drawer
}) => {
  // Drawer animation based on the position (left or right)

  width = width + 40;
  const variants = {
    open: { x: 40 },
    closed: { x: position === "left" ? `-${width}px` : `${width}px` },
  };

  return (
    <>
      {/* Drawer */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          duration: 0.2,
        }}
        className={`fixed top-0 ${position}-0 h-full z-20 bg-white shadow-lg`}
        style={{
          width: `${width}px`,
          [position === "left" ? "paddingLeft" : "paddingRight"]: 40,
        }}
      >
        <div className="w-full h-full relative">

        {children}
        </div>
      </motion.div>

      {/* Overlay (clicking it will close the drawer) */}
      {isOpen && (
        <motion.div
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-10"
        />
      )}
    </>
  );
};

export default Drawer;
