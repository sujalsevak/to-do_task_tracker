import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TCard, TColumn } from '@/types'; // Ensure TCard and TColumn are correctly imported

interface ColumnDistributionChartProps {
  cards: TCard[];
  // FIX: Add the 'columns' prop here, as it's passed from Board.tsx
  columns: TColumn[];
}

// Define colors for each column. These should ideally match your column heading colors or be complementary.
// Updated to more vibrant and eye-catching colors, covering all columns defined in Board.tsx
const COLORS: { [key in TColumn]?: string } = {
  backlog: '#FF6347',      // Tomato Red
  todo: '#FFD700',         // Gold Yellow
  doing: '#1E90FF',        // Dodger Blue
  active: '#8A2BE2',       // Blue Violet
  'in-progress': '#FFA500', // Orange
  done: '#32CD32',         // Lime Green
};

export const ColumnDistributionChart: React.FC<ColumnDistributionChartProps> = ({ cards, columns }) => {
  // Process cards data to get counts for each column
  const data = React.useMemo(() => {
    const columnCounts: { [key: string]: number } = {};

    // Initialize counts for all provided columns to ensure they appear in the data, even if 0
    columns.forEach(col => {
        columnCounts[col] = 0;
    });

    // Increment counts based on cards
    cards.forEach(card => {
      // Ensure the card's column exists in the initialized counts
      if (columnCounts[card.column] !== undefined) {
        columnCounts[card.column]++;
      }
    });

    // Convert counts to an array format suitable for Recharts
    // Filter out columns with 0 cards for the chart itself, but keep them for the legend
    return columns
      .map(colName => ({
        name: colName,
        value: columnCounts[colName] || 0, // Use 0 if no cards in this column
      }))
      .filter(entry => entry.value > 0); // Only include columns with cards in the pie chart slices
  }, [cards, columns]); // Recalculate data whenever cards or columns array changes

  // Calculate total cards for percentage calculation in the custom legend
  const totalCards = cards.length;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* FIX: Changed text-neutral-100 to text-neutral-800 dark:text-neutral-100 for theme-aware visibility */}
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Task Distribution</h2>

      {/* Container for Pie Chart (above) and Custom Legend (below) */}
      {/* Re-added chart-glow-animation here for the container glow */}
      <div className="flex flex-col items-center justify-center w-full h-full chart-glow-animation">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            {/* Shining Border Pie - This creates the animated border */}
            <Pie
              data={[{ name: 'border', value: 1 }]} // Single data point for a full circle
              cx="50%"
              cy="50%"
              outerRadius={105} // Slightly larger than main pie
              innerRadius={100} // Same as main pie's outerRadius
              fill="transparent" // Make the fill transparent
              stroke="none" // No default stroke
              isAnimationActive={false} // No animation for this background pie
            >
              {/* Apply the NEW animation class to the Cell of the border pie */}
              <Cell className="animate-pie-circle-border" />
            </Pie>

            {/* Main Data Pie */}
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100} // Main pie radius
              fill="#8884d8" // Default fill, overridden by Cell colors
              dataKey="value"
              isAnimationActive={true} // Enable animation for data pie
              animationDuration={800} // Animation duration in milliseconds
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name as TColumn] || '#ccc'} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#333',
                borderColor: '#555',
                color: '#fff',
                borderRadius: '8px',
                padding: '10px'
              }}
              itemStyle={{ color: '#fff' }} // Ensure tooltip item text is white
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Custom Legend/Summary Section - now positioned below the chart */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 p-2 rounded-lg bg-neutral-700/30 w-full">
          {/* Iterate over the 'columns' prop to ensure all board columns are listed in the legend */}
          {columns.map((columnName) => {
            const color = COLORS[columnName] || '#ccc'; // Get color, with fallback
            const entry = data.find(item => item.name === columnName);
            const percentage = totalCards > 0 ? ((entry?.value || 0) / totalCards) * 100 : 0;

            return (
              <div key={columnName} className="flex items-center gap-2 text-neutral-200 text-sm">
                <span
                  className="w-4 h-4 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: color }}
                ></span>
                <span className="font-medium whitespace-nowrap">{columnName.charAt(0).toUpperCase() + columnName.slice(1).replace('-', ' ')}:</span>
                <span className="font-bold whitespace-nowrap" style={{ color: color }}>{percentage.toFixed(0)}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
