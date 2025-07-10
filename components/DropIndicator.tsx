import React from "react";
// Corrected type import: TDropIndicatorProps
import { TDropIndicatorProps } from "@/types"; // Adjust path as needed

export const DropIndicator: React.FC<TDropIndicatorProps> = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0 transition-opacity"
    />
  );
};
