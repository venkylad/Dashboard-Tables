import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import type { Company, TableColumn } from "../../types/company";
import { ROWS_PER_PAGE_OPTIONS } from "../../constants";
import { useAppDispatch } from "../../hooks";
import { setSort } from "../../features/companies/companiesSlice";
import { companiesColumn } from "./companiesColumn";
import { customStyles } from "./customStyles";

interface Props {
  data: Company[];
  resetKey: number;
}

export default function TableView({ data, resetKey }: Props) {
  const dispatch = useAppDispatch();
  const [tablePage, setTablePage] = useState(1);
  const [tableRowsPerPage, setTableRowsPerPage] = useState(
    ROWS_PER_PAGE_OPTIONS[1]
  );

  useEffect(() => {
    setTablePage(1);
  }, [resetKey]);

  return (
    <DataTable
      columns={companiesColumn}
      data={data}
      pagination
      paginationPerPage={tableRowsPerPage}
      paginationRowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
      paginationDefaultPage={tablePage}
      onChangePage={(p) => setTablePage(p)}
      onChangeRowsPerPage={(r) => {
        setTableRowsPerPage(r);
        setTablePage(1);
      }}
      sortServer
      onSort={(column, sortDirection) => {
        // custom sortKey is our reliable source of property name
        const colWithKey = column as TableColumn<Company>;
        if (!colWithKey.sortKey) return;
        dispatch(
          setSort({
            column: colWithKey.sortKey,
            direction: sortDirection as "asc" | "desc",
          })
        );
        setTablePage(1);
      }}
      highlightOnHover
      striped
      customStyles={customStyles}
    />
  );
}
