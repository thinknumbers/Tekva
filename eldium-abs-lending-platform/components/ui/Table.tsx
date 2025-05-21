import React, { ReactNode } from 'react';

// Export TableColumn interface
export interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  render?: (item: T) => ReactNode; // Custom render function for the cell
  className?: string; // class for td
  headerClassName?: string; // class for th
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  keyExtractor: (item: T) => string | number;
}

const Table = <T extends object,>(
  { columns, data, onRowClick, keyExtractor }: TableProps<T>
): React.ReactElement => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-750"> {/* Slightly darker gray for dark mode header */}
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={`px-4 py-2.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider ${column.headerClassName || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
                No data available.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={keyExtractor(item)}
                onClick={() => onRowClick?.(item)}
                className={`${onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700' : ''} transition-colors`}
              >
                {columns.map((column, colIndex) => {
                  const value = typeof column.accessor === 'function'
                    ? column.accessor(item)
                    : item[column.accessor as keyof T];
                  return (
                    <td
                      key={colIndex}
                      className={`px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200 ${column.className || ''}`}
                    >
                      {column.render ? column.render(item) : (value as ReactNode)}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;