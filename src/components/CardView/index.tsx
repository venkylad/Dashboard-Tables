import { useEffect, useState } from "react";
import type { Company } from "../../types/company";
import { ROWS_PER_PAGE_OPTIONS } from "../../constants";
import { SelectField } from "../Select";
import Card from "./Card";

interface Props {
  data: Company[];
  resetKey: number;
}

export default function CardView({ data, resetKey }: Props) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[1]);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginated = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  useEffect(() => {
    setPage(1);
  }, [resetKey]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginated.map((company) => (
          <Card company={company} key={company.id} />
        ))}
      </div>

      <div className="flex justify-center items-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            className={`text-sm font-semibold border rounded-full w-6 h-6 hover:bg-blue-200 ${
              p === page ? "bg-blue-500 text-white border border-blue-500" : ""
            }`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}

        <SelectField
          value={rowsPerPage}
          options={ROWS_PER_PAGE_OPTIONS.map((r) => r.toString())}
          onChange={(val) => {
            setRowsPerPage(Number(val));
            setPage(1);
          }}
          icon={
            <label className="text-xs font-normal text-gray-600 text-nowrap">
              Rows per page:{" "}
            </label>
          }
        />
      </div>
    </div>
  );
}
