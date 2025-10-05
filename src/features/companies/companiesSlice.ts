import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import type { CompaniesState, Company, ViewMode } from "../../types/company";

const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:5000/companies";

export const fetchCompanies = createAsyncThunk<Company[]>(
  "companies/fetch",
  async () => {
    const res = await axios.get<Company[]>(API_URL);
    return res.data;
  }
);

const initialState: CompaniesState = {
  items: [],
  status: "idle",
  error: null,
  filters: {
    search: "",
    industry: "",
    location: "",
  },
  sort: { column: null, direction: null },
};

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    setSearch(state, action: { payload: string }) {
      state.filters.search = action.payload;
    },
    setIndustry(state, action: { payload: string }) {
      state.filters.industry = action.payload;
    },
    setLocation(state, action: { payload: string }) {
      state.filters.location = action.payload;
    },
    setSort(
      state,
      action: {
        payload: { column: keyof Company; direction: "asc" | "desc" } | null;
      }
    ) {
      state.sort = action.payload || { column: null, direction: null };
    },
    setLoadMode: (state, action: PayloadAction<"pagination" | "infinite">) => {
      state.loadMode = action.payload;
    },
    setViewMode(state, action: PayloadAction<ViewMode>) {
      state.viewMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch companies";
      });
  },
});

export const {
  setSearch,
  setIndustry,
  setLocation,
  setSort,
  setLoadMode,
  setViewMode,
} = companiesSlice.actions;
export default companiesSlice.reducer;
