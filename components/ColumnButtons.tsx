import React from "react";
import { TColumn, TColumnButtonsProps } from "@/types"; // Import TColumn and TColumnButtonsProps
import { BsArrowRight, BsCheckCircle } from "react-icons/bs"; // Assuming these icons are used

export const ColumnButtons: React.FC<TColumnButtonsProps> = ({ column, handleMove }) => {
  return (
    <div className="flex justify-between mt-4">
      {/* Button to move to 'todo' or 'doing' based on current column */}
      {column === "backlog" && (
        <button
          onClick={() => handleMove("todo")}
          className="px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200
                     border-blue-800/80 bg-blue-800/20 text-blue-500/80 hover:bg-blue-800/30"
        >
          Move to To Do <BsArrowRight className="inline ml-1" />
        </button>
      )}
      {column === "todo" && (
        <button
          onClick={() => handleMove("doing")}
          className="px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200
                     border-purple-800/80 bg-purple-800/20 text-purple-500/80 hover:bg-purple-800/30"
        >
          Move to Doing <BsArrowRight className="inline ml-1" />
        </button>
      )}
      {/* Add more conditions for 'active' or 'in-progress' if needed to move to 'done' */}
      {(column === "doing" || column === "active" || column === "in-progress") && (
        <button
          onClick={() => handleMove("done")} // FIX: Changed "completed" to "done"
          className="px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200
                     border-emerald-800/80 bg-emerald-800/20 text-emerald-500/80 hover:bg-emerald-800/30"
        >
          Mark as Done <BsCheckCircle className="inline ml-1" />
        </button>
      )}
      {/* This button allows moving to 'done' from any column except 'done' itself */}
      {column !== "done" && ( // FIX: Changed "completed" to "done"
        <button
          onClick={() => handleMove("done")} // FIX: Changed "completed" to "done"
          className="border-emerald-800/80 bg-emerald-800/20 text-emerald-500/80
                     px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-emerald-800/30"
        >
          Directly to Done <BsCheckCircle className="inline ml-1" />
        </button>
      )}
    </div>
  );
};
