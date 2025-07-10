// components/Column.tsx

import { Card } from "./Card";
import { AddCard } from "./AddCard";
import { useState } from "react";
import { TCard, TColumnProps, TColumn } from "@/types"; // Ensure TColumn is imported
import { DropIndicator } from "./DropIndicator";
import { motion, AnimatePresence } from "framer-motion";

// Extend TColumnProps to accept a className prop from the parent (Board.tsx)
interface ExtendedColumnProps extends TColumnProps {
    className?: string; // Add this line
}

export const Column = ({ title, headingColor, cards, column, setCards, className }: ExtendedColumnProps) => { // Destructure className
  const [active, setActive] = useState(false);
  const [draggingCard, setDraggingCard] = useState<TCard | null>(null);

  const filteredCards = cards?.filter(card => card?.column === column);

  const getIndicators = (): HTMLElement[] => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"][data-before]`));
  };

  const getNearestIndicator = (e: React.DragEvent<HTMLDivElement>, indicators: HTMLElement[]) => {
    const DISTANCE_THRESHOLD = 50;
    let closest = { offset: Number.NEGATIVE_INFINITY, element: indicators[0] };

    indicators.forEach(indicator => {
      const bbox = indicator.getBoundingClientRect();
      const offset = e.clientY - (bbox.top + indicator.offsetHeight / 2);

      if (offset < 0 && offset > closest.offset) {
        closest = { offset: offset, element: indicator };
      }
    });
    return closest.element;
  };

  const clearHighlights = (indicators?: HTMLElement[]) => {
    const allIndicators = indicators || getIndicators();
    allIndicators.forEach(i => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const nearest = getNearestIndicator(e, indicators);
    if (nearest) {
      nearest.style.opacity = "1";
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: TCard) => {
    setDraggingCard(card);
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    clearHighlights();
    setActive(false);

    const cardId = e.dataTransfer.getData("cardId");
    if (!cardId || !draggingCard) return;

    const indicators = getIndicators();
    const nearest = getNearestIndicator(e, indicators);
    const beforeId = nearest.dataset.before || "-1";

    if (beforeId === cardId) return;

    setCards(prevCards => {
      let copy = [...prevCards];
      let cardToMove = copy.find(card => card.id === cardId);

      if (!cardToMove) return copy;

      copy = copy.filter(card => card.id !== cardId);
      cardToMove = { ...cardToMove, column };

      const insertAtIndex = copy.findIndex(card => card.id === beforeId);

      if (insertAtIndex === -1) {
        copy.push(cardToMove);
      } else {
        copy.splice(insertAtIndex, 0, cardToMove);
      }

      return copy;
    });

    setDraggingCard(null);
  };

  return (
    // START CHANGES HERE
    // Apply the `className` prop received from Board.tsx here
    // This `className` will contain `flex-shrink-0 w-80 md:w-[280px]`
    <div className={`mb-2.5 lg:mb-0 ${className}`}>
    {/* END CHANGES HERE */}
      <div className="mb-4 flex items-center justify-between">
        {/* START CHANGES HERE */}
        {/* Added `min-w-0` and `break-words` for better text handling on small screens */}
        <h3 className={`font-semibold text-lg uppercase tracking-wider min-w-0 break-words`} style={{ color: headingColor }}>
          {title}
        </h3>
        <span className="text-sm text-neutral-800 dark:text-white font-mono px-2 py-0.5 rounded-full bg-neutral-700/50 flex-shrink-0 ml-2"> {/* Added flex-shrink-0 ml-2 */}
          {filteredCards?.length}
        </span>
        {/* END CHANGES HERE */}
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          h-full w-full rounded-lg p-3.5 flex flex-col gap-3.5 transition-all duration-300
          ${active ? "bg-gradient-to-br from-neutral-800 to-neutral-900 border-2 border-violet-500 shadow-xl" : "bg-neutral-800/60 border border-neutral-700"}
          overflow-y-auto {/* Added for vertical scroll within column if cards exceed height */}
        `}
      >
        <AnimatePresence>
          {filteredCards?.map(card => (
            <DropIndicator key={`indicator-${card?.id}`} beforeId={card.id} column={column} />
          ))}
        </AnimatePresence>
        <motion.div layout className="flex flex-col gap-3.5">
          {filteredCards?.map(card => (
            <Card
              key={card?.id}
              card={card}
              // Corrected typo here: passing 'handleDragStart'
              handleDragStart={handleDragStart}
              setCards={setCards}
            />
          ))}
        </motion.div>

        <DropIndicator beforeId="-1" column={column} />

        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};