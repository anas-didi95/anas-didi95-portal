import type { ITableData } from "@/commons/types";
import DataTablesCore, { type ConfigColumns } from "datatables.net-bm";
import DataTable, { type DataTableSlots } from "datatables.net-react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";

interface ITable {
  data: ITableData;
  headers: string[];
  columns: ConfigColumns[];
  slots?: DataTableSlots;
}

function Table({
  data: { pagination, resultList = [] },
  headers,
  columns,
  slots,
}: ITable) {
  DataTable.use(DataTablesCore);

  return (
    <>
      <div className="table-container">
        <DataTable
          className="table is-bordered is-hoverable is-fullwidth"
          data={resultList}
          columns={columns}
          slots={slots}
          options={{ paging: false, info: false }}>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={`${header}`}>{header}</th>
              ))}
            </tr>
          </thead>
        </DataTable>
      </div>
      {pagination && (
        <Pagination
          pageNo={pagination.pageNo}
          totalRecords={pagination.totalRecords}
          totalRecordsPerPage={pagination.totalRecordsPerPage}
        />
      )}
    </>
  );
}

function Pagination({
  pageNo,
  totalRecords,
  totalRecordsPerPage,
}: {
  pageNo: number;
  totalRecords: number;
  totalRecordsPerPage: number;
}) {
  const totalPages =
    Math.floor(totalRecords / totalRecordsPerPage) +
    (totalRecords % totalRecordsPerPage > 0 ? 1 : 0);
  const isCurrentFirstPage = pageNo === 1;
  const hasPrevPage = pageNo > 1;
  const hasNextPage = pageNo < totalPages;
  const isCurrentLastPage = pageNo === totalPages;

  return (
    <nav
      className="pagination is-right"
      role="navigation"
      aria-label="pagination">
      <ul className="pagination-list">
        <li>
          <button className="pagination-link" disabled={isCurrentFirstPage}>
            <FaAnglesLeft />
          </button>
        </li>
        <li>
          <button className="pagination-link" disabled={!hasPrevPage}>
            <FaAngleLeft />
          </button>
        </li>
        <li className="mx-1">
          <div className="field has-addons has-addons-right">
            <div className="control">
              <button className="button is-static">Page</button>
            </div>
            <div className="control">
              <input className="input" type="text" size={2} value={pageNo} />
            </div>
            <div className="control">
              <button className="button is-static">of {totalPages}</button>
            </div>
          </div>
        </li>
        <li>
          <button className="pagination-link" disabled={!hasNextPage}>
            <FaAngleRight />
          </button>
        </li>
        <li>
          <button className="pagination-link" disabled={isCurrentLastPage}>
            <FaAnglesRight />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Table;
