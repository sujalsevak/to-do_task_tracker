// components/Board.tsx

import React, { useState, useEffect } from "react";
import type { TCard, TColumn } from "../types"; // Adjust path if your types are elsewhere

import { Column } from "./Column"; // Correct way to import a named export
import { ColumnDistributionChart } from "./ColumnDistributionChart"; // Import the chart component
import { BsSun, BsMoon } from "react-icons/bs"; // Import sun and moon icons

// FIX: Changed to a default export
const Board = () => {
  const [cards, setCards] = useState<TCard[]>([]);
  // Add theme state and initialize from localStorage or system preference
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme as 'light' | 'dark';
      }
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light'; // Default to light if no preference found
  });

  // Effect to load/save cards from/to local storage
  useEffect(() => {
    const storedCards = localStorage.getItem("kanban-cards");
    if (storedCards) {
      setCards(JSON.parse(storedCards));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kanban-cards", JSON.stringify(cards));
  }, [cards]);

  // Effect to apply 'dark' class to html element and save theme to localStorage
  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Define your columns. Ensure these match your TColumn type.
  const columns: TColumn[] = ["backlog", "todo", "doing", "active", "in-progress", "done"];

  // Define a mapping for column heading colors using hex codes, ensuring all TColumn members are covered
  const COLUMN_COLORS: { [key in TColumn]: string } = {
    backlog: '#FF6347',      // Tomato Red
    todo: '#FFD700',         // Gold Yellow
    doing: '#1E90FF',        // Dodger Blue
    active: '#8A2BE2',       // Blue Violet
    'in-progress': '#FFA500', // Orange
    done: '#32CD32',         // Lime Green
  };

  return (
    // Adjusted background colors to be theme-aware using Tailwind's dark mode variants
    <div className="min-h-screen h-full bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 p-12 overflow-y-auto transition-colors duration-300">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 text-center flex-grow">
          To-Do Task Tracker Board
        </h1>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 shadow-md transition-colors duration-300 hover:scale-110"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <BsMoon size={20} /> : <BsSun size={20} />}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {columns.map((col) => (
          <Column
            key={col}
            title={col.charAt(0).toUpperCase() + col.slice(1).replace('-', ' ')} // Capitalize and format title
            column={col}
            cards={cards}
            setCards={setCards}
            headingColor={COLUMN_COLORS[col]}
          />
        ))}
      </div>
      {/* Add your ColumnDistributionChart here, passing necessary data */}
      <div className="mt-12">
        <ColumnDistributionChart cards={cards} columns={columns} />
      </div>
      {/* Assuming BurnBarrel is also a component you might use */}
      {/* <BurnBarrel setCards={setCards} /> */}
    </div>
  );
};

export default Board; // FIX: Exporting Board as default
