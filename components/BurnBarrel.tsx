import { DragEvent, useState } from "react";
import { TBurnBarrelProps } from "@/types";
import { BsTrash2, BsFire } from "react-icons/bs";
import { motion } from "framer-motion"; // Import motion

export const BurnBarrel = ({ setCards }: TBurnBarrelProps) => {
  const [active, setActive] = useState(false);
  const handleDragOver = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setActive(true);
  };
  const handleDragLeave = () => {
    setActive(false);
  };
  const handleDrop = (event: { dataTransfer: { getData: (arg0: string) => any; }; }) => {
    const cardId = event.dataTransfer.getData("cardId");
    setCards((prev) => prev?.filter(card => card?.id !== cardId));
    setActive(false);
  };

  return (
    <motion.div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      layout // Ensures smooth layout transitions if it moves/resizes
      initial={{ scale: 0.8, opacity: 0 }} // Start smaller, hidden
      animate={{ scale: 1, opacity: 1 }} // Appear full size
      exit={{ scale: 0.8, opacity: 0 }} // Disappear
      className={`
        hidden lg:grid mt-10 h-56 w-56 shrink-0 place-content-center rounded-xl transition-all duration-300
        ${active
          ? "border-4 border-red-500 bg-red-900/50 text-red-400 shadow-red-500/50 shadow-2xl scale-105" // More intense red, thicker border, larger shadow, slight scale up
          : "border-2 border-neutral-600 bg-neutral-800/60 text-neutral-500" // Subtle border, darker background
        }
      `}
    >
      {active ? (
        <motion.div
          key="fire-icon"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: [0.5, 1.2, 1], rotate: [0, 10, -10, 0] }} // Pop in and subtle wobble
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <BsFire className="text-6xl" /> {/* Larger icon */}
        </motion.div>
      ) : (
        <motion.div
          key="trash-icon"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <BsTrash2 className="text-5xl" /> {/* Larger icon */}
        </motion.div>
      )}
    </motion.div>
  );
};