    // types/index.ts

    // Define the comprehensive TColumn type here, including all possible states
    export type TColumn = "backlog" | "todo" | "doing" | "active" | "in-progress" | "done";

    // You can also define TCard here if it's used across multiple files
    export interface TCard {
      id: string;
      title: string;
      description?: string; // Added description as optional
      column: TColumn;
    }

    // Add TAddCardProps interface here and export it
    export interface TAddCardProps {
      column: TColumn;
      setCards: React.Dispatch<React.SetStateAction<TCard[]>>;
    }

    // FIX: Add ColumnDistributionChartProps interface here and export it
    export interface ColumnDistributionChartProps {
      cards: TCard[];
      columns: TColumn[]; // This property is crucial for the ColumnDistributionChart
    }

    // Define and export TBurnBarrelProps (from previous discussion)
    export interface TBurnBarrelProps {
      setCards: React.Dispatch<React.SetStateAction<TCard[]>>;
    }

    // FIX: Define and export TDropIndicatorProps
    export interface TDropIndicatorProps {
      beforeId: string | null;
      column: TColumn;
    }

    // FIX: Define and export TCardComponentProps for the Card component
    export interface TCardComponentProps {
      card: TCard;
      setCards: React.Dispatch<React.SetStateAction<TCard[]>>;
      // FIX: Updated handleDragStart to accept React.DragEvent<HTMLDivElement>
      handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: TCard) => void;
    }

    // FIX: Define and export TColumnProps for the Column component
    export interface TColumnProps {
      title: string;
      column: TColumn;
      cards: TCard[];
      setCards: React.Dispatch<React.SetStateAction<TCard[]>>;
      // FIX: Add headingColor to TColumnProps
      headingColor: string;
    }

    // FIX: Define and export TColumnButtonsProps for the ColumnButtons component
    export interface TColumnButtonsProps {
      column: TColumn;
      handleMove: (newColumn: TColumn) => void;
    }
    