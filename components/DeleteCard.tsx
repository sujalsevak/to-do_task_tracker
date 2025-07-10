import React from "react";
import { FiTrash } from "react-icons/fi"; // This requires 'react-icons' to be installed

interface DeleteCardProps {
  onClick: () => void;
}

export const DeleteCard: React.FC<DeleteCardProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="opacity-60 hover:opacity-100 transition-opacity text-neutral-400 hover:text-red-500"
      title="Delete card"
    >
      <FiTrash />
    </button>
  );
};
