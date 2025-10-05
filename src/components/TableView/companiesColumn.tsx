import { ExternalLink } from "lucide-react";
import type { Company, TableColumn } from "../../types/company";

export const companiesColumn: TableColumn<Company>[] = [
  {
    name: "Name",
    cell: (row) => (
      <div className="mb-2 flex gap-1.5 items-center">
        <img
          className="w-10 h-10 border-4 border-blue-300 rounded-full object-cover"
          src={row?.logo}
          alt={row?.name}
          title={row.ceo}
        />
        <div>
          <a
            href={`https://${row.domain}`}
            target="_blank"
            rel="noreferrer"
            className="hover:underline mt-auto flex items-center gap-1"
          >
            <h5 className="text-sm font-medium text-gray-700 hover:text-blue-600">
              {row.name}
            </h5>
            <ExternalLink className="text-blue-600" size={12} />
          </a>

          <p className="text-xs font-normal text-gray-500">{row.email}</p>
        </div>
      </div>
    ),
    sortable: true,
    sortKey: "name",
    grow: 2,
  },
  {
    name: "Industry",
    cell: (row) => (
      <div className="text-md uppercase font-semibold text-nowrap text-white bg-blue-500 rounded-full py-1 px-2.5">
        {row.industry}
      </div>
    ),
    sortable: true,
    sortKey: "industry",
    grow: 1,
    minWidth: "200px",
  },
  {
    name: "CEO",
    cell: (row) => (
      <p className="text-md font-normal text-gray-700">{row.ceo}</p>
    ),
    sortKey: "ceo",
  },
  {
    name: "Location",
    cell: (row) => (
      <p className="text-md font-normal text-gray-700">{row.location}</p>
    ),
    sortable: true,
    sortKey: "location",
    grow: 1,
  },
  {
    name: "Founded",
    cell: (row) => (
      <p className="text-md font-normal text-gray-700">{row.founded}</p>
    ),
    sortable: true,
    sortKey: "founded",
    maxWidth: "120px",
    center: true,
  },
  {
    name: "Employees",
    cell: (row) => (
      <p className="text-md font-normal text-gray-700">{row.employees}</p>
    ),
    sortable: true,
    sortKey: "employees",
    width: "130px",
    center: true,
  },
];
