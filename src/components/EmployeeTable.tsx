import React, { useContext, useState } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import { EmployeeContext } from "../context/EmployeeContext";
import { Employee } from "../types/Employee";
import EmployeeForm from "./EmployeeForm";
import "../styles/EmployeeTable.scss";

const EmployeeTable: React.FC = () => {
  const { employees, deleteEmployee } = useContext(EmployeeContext)!;
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Filter: ColumnFilter,
      },
      {
        Header: "Department",
        accessor: "department",
        Filter: ColumnFilter,
      },
      {
        Header: "Position",
        accessor: "position",
        Filter: ColumnFilter,
      },
      {
        Header: "Actions",
        Cell: ({ row }: { row: any }) => (
          <div>
            <button
              className="edit-button"
              onClick={() => setEditingEmployee(row.original)}
            >
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => deleteEmployee(row.original.id)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [deleteEmployee]
  );

  const data = React.useMemo(() => employees, [employees]);

  const defaultColumn = {
    Filter: ColumnFilter,
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data, defaultColumn }, useFilters, useSortBy);

  return (
    <div className="employee-table-container">
      {editingEmployee && (
        <EmployeeForm
          employee={editingEmployee}
          onClose={() => setEditingEmployee(null)}
        />
      )}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {data.length > 0 && rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="no-data-message">
                No matching records found.
              </td>
            </tr>
          ) : (
            rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })
          )}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="no-data-message">
                No employees available. Please add some employees.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const ColumnFilter = ({ column }: any) => {
  const { filterValue, setFilter } = column;
  return (
    <input
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value || undefined)}
      placeholder={`Search ${column.Header}`}
    />
  );
};

export default EmployeeTable;
