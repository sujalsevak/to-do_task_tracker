import { motion } from "framer-motion";
// Ensure you import TCard and TCardComponentProps (or whatever you've named your Card props type)
import { TCard, TCardComponentProps, TColumn } from "@/types"; // Adjust path as needed
import { useState } from "react";

// Assuming you have a DeleteCard and ColumnButtons component
import { DeleteCard } from "./DeleteCard";
import { ColumnButtons } from "./ColumnButtons";

// Ensure 'Card' is exported correctly
export const Card = ({ card, handleDragStart, setCards }: TCardComponentProps) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);

  // Function to delete a card
  const handleDelete = (id: string) => {
    setCards((prev: TCard[]) => prev.filter((c: TCard) => c.id !== id));
  };

  // Function to move a card to a different column
  const handleMove = (newColumn: TColumn) => { // Explicitly type newColumn as TColumn
    setCards((prev: TCard[]) =>
      prev.map((c: TCard) => { // Explicitly type c as TCard
        if (c.id === card.id) {
          return { ...c, column: newColumn };
        }
        return c;
      })
    );
  };

  return (
    <motion.div
      layout // Enable layout animations with Framer Motion
      layoutId={card.id} // Unique ID for consistent animations
      onMouseEnter={() => setMouseIsOver(true)} // Show controls on mouse enter
      onMouseLeave={() => setMouseIsOver(false)} // Hide controls on mouse leave
      className="relative rounded-lg border border-neutral-700 bg-neutral-800 p-3.5 shadow-md"
    >
      {/*
        Moved draggable and onDragStart to an inner div to use native HTML drag events.
        motion.div still handles layout animations.
      */}
      <div
        draggable="true" // Make the card draggable using native HTML drag-and-drop
        onDragStart={(e: React.DragEvent<HTMLDivElement>) => handleDragStart(e, card)} // Pass the card to handleDragStart
        className="cursor-grab active:cursor-grabbing" // Apply cursor styles here
      >
        <p className="text-sm text-neutral-100">{card.title}</p>
      </div>

      {/* Conditionally render delete and column buttons */}
      <div
        className={`absolute bottom-0 left-0 right-0 top-0 flex items-center justify-end gap-1.5 rounded-b-lg bg-gradient-to-t from-neutral-800 to-neutral-800/0 p-3.5 pr-2 transition-[opacity] ${
          mouseIsOver ? "opacity-100" : "opacity-0"
        }`}
      >
        <DeleteCard onClick={() => handleDelete(card.id)} />
        <ColumnButtons column={card.column} handleMove={handleMove} />
      </div>
    </motion.div>
  );
};
