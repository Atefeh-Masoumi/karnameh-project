import React, { useEffect, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import DebouncedInput from "./DebouncedInput";
import { SearchIcon, FilterIcon, DescIcon, AscIcon } from "../Icons/Icons";
import { usegetUsers } from "../services/UsersApi";
import { Users } from "../services/types";
import { useNavigate } from "react-router-dom";

const DashBoard: React.FC = () => {
  const columnHelper = createColumnHelper<Users>();
  const navigate = useNavigate();
  const columns: ColumnDef<Users, any>[] = [
    columnHelper.accessor("id", {
      id: "No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "No",
    }),
    columnHelper.accessor("name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "FullName",
      enableSorting: true,
    }),
    columnHelper.accessor("username", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Username",
    }),
    columnHelper.accessor("email", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Email",
      enableSorting: true,
    }),
    columnHelper.accessor("address.city", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "City",
    }),
    columnHelper.accessor("phone", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Phone",
    }),
    columnHelper.accessor("website", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Website",
    }),
    columnHelper.accessor("company.name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Company",
    }),
  ];

  const { data: users, isLoading } = usegetUsers();
  const [data, setData] = useState<Users[]>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    if (users) {
      setData(users);
    }
  }, [users]);

  const handleRowClick = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  const table = useReactTable<Users>({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 w-full">
        <h1 className="text-2xl font-semibold mb-2 md:mb-0">User Dashboard</h1>
        <div className="flex w-full md:w-auto items-center gap-2">
          <SearchIcon />
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value: string) => setGlobalFilter(String(value))}
            className="p-2 bg-transparent outline-none border-b-2 w-full md:w-80 border-indigo-500"
            placeholder="Search all columns..."
          />
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto border border-slate-400 rounded-lg shadow-lg">
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-400 text-white sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="capitalize px-3.5 py-2 cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {/* Flex container for proper alignment */}
                    <div className="flex items-center">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <span className="ml-2">
                        {{
                          asc: (
                            <span className="inline-block h-4 w-4">
                              <AscIcon />
                            </span>
                          ),
                          desc: (
                            <span className="inline-block h-4 w-4">
                              <DescIcon />
                            </span>
                          ),
                        }[header.column.getIsSorted() as string] ?? (
                            <span className="inline-block h-4 w-4">
                              <FilterIcon />
                            </span>
                          )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}


          </thead>
          <tbody>
            {isLoading &&
              <tr className="text-center h-32">
                <td colSpan={12}>Loading...</td>
              </tr>
            }
            {table.getRowModel().rows.length === 0 && isLoading === false ? (
              <tr className="text-center h-32">
                <td colSpan={12}>No Record Found!</td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  onClick={() => handleRowClick(row.original.id)}
                  className={`cursor-pointer hover:bg-indigo-700 hover:text-white ${i % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                    }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3.5 py-2 truncate whitespace-nowrap overflow-hidden">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))

            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-1 border border-gray-300 px-2 rounded disabled:opacity-50"
          >
            {"<"}
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-1 border border-gray-300 px-2 rounded disabled:opacity-50"
          >
            {">"}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span>
            Page{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span>
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16 bg-transparent"
            />
          </span>
        </div>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="p-2 border rounded"
        >
          {[5, 8, 10].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DashBoard;
