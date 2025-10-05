import { useEffect, useState, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import type { Company } from "../../types/company";
import { ROWS_PER_PAGE_OPTIONS } from "../../constants";
import { SelectField } from "../Select";
import Card from "./Card";
import { useAppSelector } from "../../hooks";
import { OctagonAlert } from "lucide-react";

interface Props {
  data: Company[];
  resetKey: number;
}

export default function CardView({ data, resetKey }: Props) {
  const loadMode = useAppSelector((s) => s.companies.loadMode);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    ROWS_PER_PAGE_OPTIONS[1]
  );

  // for infinite mode: number of items currently shown
  const [itemsCount, setItemsCount] = useState<number>(rowsPerPage);

  useEffect(() => {
    setPage(1);
    setItemsCount(rowsPerPage);
  }, [resetKey, rowsPerPage]);

  // when rowsPerPage changes, ensure itemsCount aligns in infinite mode
  useEffect(() => {
    if (loadMode === "infinite") {
      setItemsCount(rowsPerPage);
    }
  }, [rowsPerPage, loadMode]);

  const totalPages = Math.max(1, Math.ceil(data.length / rowsPerPage));
  const paginated = useMemo(
    () => data.slice((page - 1) * rowsPerPage, page * rowsPerPage),
    [data, page, rowsPerPage]
  );

  const itemsToShow = useMemo(
    () => (loadMode === "infinite" ? data.slice(0, itemsCount) : paginated),
    [loadMode, data, itemsCount, paginated]
  );

  const fetchMore = () => {
    // load next chunk
    setItemsCount((prev) => Math.min(prev + rowsPerPage, data.length));
  };

  if (itemsToShow?.length === 0) {
    return (
      <div className="p-16 text-2xl text-gray-700 font-semibold flex flex-col items-center justify-center gap-4">
        <OctagonAlert size={60} className="text-red-600" />
        <p>No companies found.</p>
      </div>
    );
  }

  return (
    <div>
      {loadMode === "infinite" ? (
        <InfiniteScroll
          dataLength={itemsToShow.length}
          next={fetchMore}
          hasMore={itemsToShow.length < data.length}
          scrollThreshold={0.5}
          loader={
            <div className="text-center text-gray-400 mt-4 font-semibold text-sm">
              Loading...
            </div>
          }
          endMessage={
            <div className="text-center text-gray-400 mt-4 font-semibold text-sm">
              Showing {data.length} companies
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {itemsToShow.map((company) => (
              <Card company={company} key={company.id} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {itemsToShow.map((company) => (
              <Card company={company} key={company.id} />
            ))}
          </div>

          <div className="flex justify-between items-center mt-4 gap-2">
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`text-sm font-semibold border rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-200 ${
                    p === page ? "bg-blue-500 text-white border-blue-500" : ""
                  }`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-600">Rows per page:</label>
              <SelectField
                value={String(rowsPerPage)}
                options={ROWS_PER_PAGE_OPTIONS.map((r) => r.toString())}
                onChange={(val) => {
                  const n = Number(val);
                  setRowsPerPage(n);
                  setPage(1);
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
