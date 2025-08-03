import type { ITableData } from "@/commons/types";
import DataTablesCore, { type ConfigColumns } from "datatables.net-bm";
import DataTable from "datatables.net-react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";

interface ITable {
  headers: string[];
  columns: ConfigColumns[];
  data: ITableData;
}

function Table({ headers, columns, data: { pagination, resultList } }: ITable) {
  DataTable.use(DataTablesCore);

  return (
    <>
      <div className="table-container">
        <DataTable
          columns={columns}
          className="table is-bordered is-hoverable is-fullwidth"
          data={resultList}
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

  return (
    <nav
      className="pagination is-right"
      role="navigation"
      aria-label="pagination">
      <ul className="pagination-list">
        <li>
          <a href="#" className="pagination-link">
            <FaAnglesLeft />
          </a>
        </li>
        <li>
          <a href="#" className="pagination-link">
            <FaAngleLeft />
          </a>
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
          <a href="#" className="pagination-link">
            <FaAngleRight />
          </a>
        </li>
        <li>
          <a href="#" className="pagination-link">
            <FaAnglesRight />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Table;
