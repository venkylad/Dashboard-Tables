import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchCompanies } from "./features/companies/companiesSlice";
import Filters from "./components/Filters";
import { filterAndSortCompanies } from "./features/companies/filterSort";
import { VIEW_MODES } from "./constants";
import TableView from "./components/TableView";
import CardView from "./components/CardView";
import Navbar from "./components/Navbar";

export default function App() {
  const dispatch = useAppDispatch();
  const { items, status, error, filters, sort } = useAppSelector(
    (s) => s.companies
  );

  const [viewMode, setViewMode] =
    useState<(typeof VIEW_MODES)[number]>("cards");

  const [resetKey, setResetKey] = useState(0);

  const handleFilterChange = () => {
    setResetKey((k) => k + 1);
  };

  const handleViewMode = (mode: (typeof VIEW_MODES)[number]) => {
    setViewMode(mode);
  };

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const filtered = filterAndSortCompanies(
    items,
    filters.search,
    filters.industry,
    filters.location,
    sort
  );

  if (status === "pending") return <div className="p-6">Loading...</div>;
  if (status === "failed")
    return <div className="p-6 text-red-500">{error}</div>;

  return (
    <main className="bg-[#f9f9f9] min-h-screen pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">
        <div>
          <Filters
            onFilterChange={handleFilterChange}
            viewMode={viewMode}
            handleViewMode={handleViewMode}
          />
        </div>

        {viewMode === "table" ? (
          <TableView data={filtered} resetKey={resetKey} />
        ) : (
          <CardView data={filtered} resetKey={resetKey} />
        )}
      </div>
    </main>
  );
}
