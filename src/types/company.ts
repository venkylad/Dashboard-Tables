import { type TableColumn as BaseTableColumn } from "react-data-table-component";

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
  loadMode: "pagination" | "infinite";
}

export interface TableColumn<T> extends BaseTableColumn<T> {
  sortKey?: keyof T;
}
