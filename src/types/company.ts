import { type TableColumn as BaseTableColumn } from "react-data-table-component";
import type { LOAD_MODES, VIEW_MODES } from "../constants";

export interface Company {
  id: number;
  name: string;
  industry: string;
  location: string;
  founded: number;
  size: string;
  domain: string;
  description: string;
  employees: number;
  ceo: string;
  email: string;
  phone: string;
  logo: string;
}

export type Status = "idle" | "pending" | "succeeded" | "failed";

export type SortState = {
  column: keyof Company | null;
  direction: "asc" | "desc" | null;
};

export interface CompaniesState {
  items: Company[];
  status: Status;
  error: string | null;
  filters: {
    search: string;
    industry: string;
    location: string;
  };
  sort: SortState;
  loadMode?: LoadMode;
  viewMode?: ViewMode;
}

export interface TableColumn<T> extends BaseTableColumn<T> {
  sortKey?: keyof T;
}

export type ViewMode = (typeof VIEW_MODES)[number];
export type LoadMode = (typeof LOAD_MODES)[number];
