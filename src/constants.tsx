import { BookOpen, Grid2X2, Scroll, Table2 } from "lucide-react";

export const ROWS_PER_PAGE_OPTIONS = [12, 20, 30, 50];
export const SORT_OPTIONS = [
  { label: "Name A-Z", value: "name-asc" },
  { label: "Name Z-A", value: "name-desc" },
];
export const VIEW_MODES = ["table", "cards"] as const;
export const LOAD_MODES = ["pagination", "infinite"] as const;

export const loadModeOptions = [
  {
    label: "Pagination",
    value: "pagination",
    icon: <BookOpen size={16} />,
  },
  {
    label: "Infinite Scroll",
    value: "infinite",
    icon: <Scroll size={16} />,
  },
];

export const viewModeOptions: {
  label: string;
  value: "cards" | "table";
  icon: React.ReactNode;
}[] = [
  { label: "Cards", value: "cards", icon: <Grid2X2 size={16} /> },
  { label: "Table", value: "table", icon: <Table2 size={16} /> },
];
