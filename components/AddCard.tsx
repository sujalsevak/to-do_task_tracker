import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { FormEvent, useState } from "react";
import { TAddCardProps, TCard } from "@/types";

export const AddCard = ({ column, setCards }: TAddCardProps) => {
  const [title, setTitle] = useState("");
  const [adding, setAdding] = useState(false);
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim().length) return;
    const card: TCard = {
      id: Math.random().toString(),
      title: title.trim(),
      column
    };
    setCards((prev) => [...prev, card]);
    setTitle(""); // Clear input after adding
    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form
          layout
          initial={{ opacity: 0, y: 10 }} // Form slides up and fades in
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }} // Form slides down and fades out
          onSubmit={handleSubmit}
          className="p-3" // Add padding to form itself
        >
          <textarea
            onChange={(event) => setTitle(event.target.value)}
            value={title} // Bind value to state for clearing
            autoFocus
            placeholder="Enter task details..." // More inviting placeholder
            className="
              w-full rounded-md border border-violet-500 bg-neutral-800 p-3 text-sm
              text-neutral-50 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-500
              resize-none h-24
            " // More robust input styling
          />
          <div className="flex items-center justify-end mt-2 gap-2 text-sm"> {/* Slightly larger text, more gap */}
            <button
              onClick={() => setAdding(false)}
              className="
                px-4 py-2 rounded-md text-neutral-400 transition-colors duration-200
                hover:text-neutral-50 hover:bg-neutral-700/50
              "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="
                px-4 py-2 flex items-center gap-1.5 rounded-md
                bg-violet-600 text-white transition-colors duration-200
                hover:bg-violet-500 hover:shadow-lg
              " // Vibrant violet add button
            >
              <span>Add Task</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          initial={{ opacity: 0, y: 10 }} // Button slides up and fades in
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }} // Button slides down and fades out
          onClick={() => setAdding(true)}
          className="
            flex w-full items-center gap-1.5 px-3 py-2 text-sm
            text-violet-400 transition-colors duration-200
            hover:text-violet-300 hover:bg-neutral-800 rounded-md
            outline-none border-2 border-dashed border-neutral-700 hover:border-violet-500
          " // Dashed border, more prominent hover
        >
          <span>Add new card</span> {/* Updated text */}
          <FiPlus className="text-xl" /> {/* Larger icon */}
        </motion.button>
      )}
    </>
  );
};