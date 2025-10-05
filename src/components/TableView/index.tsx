import { useEffect, useState, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import DataTable from "react-data-table-component";
import type { Company, TableColumn } from "../../types/company";
import { ROWS_PER_PAGE_OPTIONS } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setSort } from "../../features/companies/companiesSlice";
import { companiesColumn } from "./companiesColumn";
import { customStyles } from "./customStyles";

interface Props {
  data: Company[];
  resetKey: number;
}

export default function TableView({ data, resetKey }: Props) {
  const dispatch = useAppDispatch();
  const loadMode = useAppSelector((s) => s.companies.loadMode);

  const [tablePage, setTablePage] = useState(1);
  const [tableRowsPerPage, setTableRowsPerPage] = useState<number>(
    ROWS_PER_PAGE_OPTIONS[1]
  );

  // infinite state: how many rows currently visible
  const [itemsCount, setItemsCount] = useState<number>(tableRowsPerPage);

  useEffect(() => {
    setTablePage(1);
    setItemsCount(tableRowsPerPage);
  }, [resetKey, tableRowsPerPage]);

  useEffect(() => {
    if (loadMode === "infinite") setItemsCount(tableRowsPerPage);
  }, [loadMode, tableRowsPerPage]);

  const paginated = useMemo(
    () =>
      data.slice(
        (tablePage - 1) * tableRowsPerPage,
        tablePage * tableRowsPerPage
      ),
    [data, tablePage, tableRowsPerPage]
  );

  const itemsToShow = useMemo(
    () => (loadMode === "infinite" ? data.slice(0, itemsCount) : paginated),
    [loadMode, data, itemsCount, paginated]
  );

  const fetchMore = () => {
    setItemsCount((prev) => Math.min(prev + tableRowsPerPage, data.length));
  };

  return loadMode === "infinite" ? (
    <InfiniteScroll
      dataLength={itemsToShow.length}
      next={fetchMore}
      hasMore={itemsToShow.length < data.length}
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
      <div className="overflow-x-auto">
        <DataTable
          columns={companiesColumn}
          data={itemsToShow}
          sortServer
          onSort={(column, sortDirection) => {
            const colWithKey = column as TableColumn<Company>;
            if (!colWithKey.sortKey) return;
            dispatch(
              setSort({
                column: colWithKey.sortKey,
                direction: sortDirection as "asc" | "desc",
              })
            );
            setTablePage(1);
            // reset infinite items to page size so user sees sorted top
            setItemsCount(tableRowsPerPage);
          }}
          highlightOnHover
          customStyles={customStyles}
          pagination={false}
        />
      </div>
    </InfiniteScroll>
  ) : (
    <DataTable
      columns={companiesColumn}
      data={itemsToShow}
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
      customStyles={customStyles}
    />
  );
}
