import { useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  setSearch,
  setIndustry,
  setLocation,
  setSort,
  setLoadMode,
  setViewMode,
} from "../../features/companies/companiesSlice";
import {
  SORT_OPTIONS,
  VIEW_MODES,
  LOAD_MODES,
  viewModeOptions,
  loadModeOptions,
} from "../../constants";
import {
  ArrowDownAZIcon,
  Building2,
  Grid2X2,
  MapPin,
  Search,
  Table2,
} from "lucide-react";
import { SelectField } from "../Select";
import type { LoadMode, ViewMode } from "../../types/company";
import { ToggleButtonGroup } from "../ToggleButton";

interface FiltersProps {
  onFilterChange: () => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const dispatch = useAppDispatch();
  const { items, filters, sort, loadMode, viewMode } = useAppSelector(
    (s) => s.companies
  );
  const searchRef = useRef<HTMLInputElement>(null);

  const industries = useMemo(
    () => Array.from(new Set(items.map((c) => c.industry))),
    [items]
  );
  const locations = useMemo(
    () => Array.from(new Set(items.map((c) => c.location))),
    [items]
  );

  const filtersApplied = useMemo(
    () =>
      (filters.search && filters.search.trim() !== "") ||
      (filters.industry && filters.industry !== "") ||
      (filters.location && filters.location !== "") ||
      (!!sort && sort.column && sort.direction),
    [filters, sort]
  );

  // Autofocus
  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  // Read from URL on first load (includes view & load)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const search = params.get("search") || "";
    const industry = params.get("industry") || "";
    const location = params.get("location") || "";
    const sortParam = params.get("sort");
    const viewParam = (params.get("view") || "") as ViewMode | "";
    const loadParam = (params.get("load") || "") as LoadMode | "";

    if (search) dispatch(setSearch(search));
    if (industry) dispatch(setIndustry(industry));
    if (location) dispatch(setLocation(location));

    if (sortParam) {
      const [col, dir] = sortParam.split("|");
      dispatch(
        setSort({ column: col as any, direction: dir as "asc" | "desc" })
      );
    }

    // view mode from url -> call parent handler (App owns viewMode state)
    if (viewParam && (VIEW_MODES as readonly string[]).includes(viewParam)) {
      dispatch(setViewMode(viewParam as ViewMode));
    }

    // load mode from url -> dispatch to redux
    if (loadParam && (LOAD_MODES as readonly string[]).includes(loadParam)) {
      dispatch(setLoadMode(loadParam as LoadMode));
    }
  }, [dispatch]);

  // Sync Redux & view -> URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search) params.set("search", filters.search);
    if (filters.industry) params.set("industry", filters.industry);
    if (filters.location) params.set("location", filters.location);
    if (sort?.column && sort.direction)
      params.set("sort", `${sort.column}|${sort.direction}`);

    // persist view and load
    if (viewMode) params.set("view", viewMode);
    if (loadMode) params.set("load", loadMode);

    const query = params.toString();
    const url = query ? `?${query}` : window.location.pathname;

    window.history.replaceState({}, "", url);
  }, [filters, sort, viewMode, loadMode]);

  const handleInput = (fn: any, value: string) => {
    dispatch(fn(value));
    onFilterChange();
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4 w-full">
        <div>
          <h5 className="text-xl text-gray-800 font-semibold">Companies</h5>
          <p className="text-sm text-gray-600 font-normal">
            List of companies you have access to
          </p>
        </div>
        <div className="max-w-sm relative flex items-center border border-gray-300 rounded-md px-2 py-1.5 bg-white gap-2 w-full md:w-auto hover:border-blue-400 focus-within:border-blue-700 focus-within:ring-2 focus-within:ring-blue-400 focus-within:outline-none transition-all">
          <Search size={16} className="text-gray-600" />
          <input
            ref={searchRef}
            type="text"
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => handleInput(setSearch, e.target.value)}
            className="border-0 text-gray-700 focus:ring-0 focus:outline-0 ml-2 w-full text-sm placeholder:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 w-full">
        <div className="flex flex-col md:flex-row gap-4">
          <SelectField
            icon={<Building2 size={16} className="text-gray-600" />}
            value={filters.industry}
            options={industries}
            placeholder="All Industries"
            onChange={(v) => handleInput(setIndustry, v)}
          />
          <SelectField
            icon={<MapPin size={16} className="text-gray-600" />}
            value={filters.location}
            options={locations}
            placeholder="All Locations"
            onChange={(v) => handleInput(setLocation, v)}
          />
          <SelectField
            icon={<ArrowDownAZIcon size={16} className="text-gray-600" />}
            value={
              sort?.column && sort.direction
                ? `${String(sort.column)}|${sort.direction}`
                : ""
            }
            options={SORT_OPTIONS}
            placeholder="Sort by"
            onChange={(val) => {
              if (!val) {
                dispatch(setSort(null));
                onFilterChange();
                return;
              }
              const [column, direction] = val.split("|");
              dispatch(
                setSort({
                  column: column as any,
                  direction: direction as "asc" | "desc",
                })
              );
              onFilterChange();
            }}
          />
          {filtersApplied && (
            <button
              onClick={() => {
                dispatch(setSearch(""));
                dispatch(setIndustry(""));
                dispatch(setLocation(""));
                dispatch(setSort(null));
                onFilterChange();
              }}
              className="text-sm text-blue-700 hover:underline transition cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <ToggleButtonGroup
            options={viewModeOptions}
            selected={viewMode || "cards"}
            onChange={(mode) => dispatch(setViewMode(mode))}
          />

          <ToggleButtonGroup
            options={loadModeOptions}
            selected={loadMode || "pagination"}
            onChange={(mode) => dispatch(setLoadMode(mode as LoadMode))}
          />
        </div>
      </div>
    </div>
  );
}
