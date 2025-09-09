import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import { DataTableProps, Column, SortState } from './DataTable.types';

export const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  multiSelect = true,
  onRowSelect,
  onSort,
  className = '',
  rowKey = 'id',
  emptyText = 'No data available',
  size = 'md',
  bordered = true,
  hoverable = true,
}: DataTableProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortState, setSortState] = useState<SortState<T>>({
    column: null,
    direction: null,
  });

  // Get row key function
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] || index;
  };

  // Handle row selection
  const handleRowSelect = (record: T, checked: boolean) => {
    let newSelectedRows: T[];
    
    if (multiSelect) {
      if (checked) {
        newSelectedRows = [...selectedRows, record];
      } else {
        newSelectedRows = selectedRows.filter(row => 
          getRowKey(row, 0) !== getRowKey(record, 0)
        );
      }
    } else {
      newSelectedRows = checked ? [record] : [];
    }
    
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    const newSelectedRows = checked ? [...data] : [];
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  // Handle sorting
  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;
    
    let newDirection: 'asc' | 'desc' | null = 'asc';
    
    if (sortState.column === column.dataIndex) {
      if (sortState.direction === 'asc') {
        newDirection = 'desc';
      } else if (sortState.direction === 'desc') {
        newDirection = null;
      }
    }
    
    const newSortState = {
      column: newDirection ? column.dataIndex : null,
      direction: newDirection,
    };
    
    setSortState(newSortState);
    onSort?.(newSortState.column!, newSortState.direction);
  };

  // Check if row is selected
  const isRowSelected = (record: T): boolean => {
    return selectedRows.some(row => 
      getRowKey(row, 0) === getRowKey(record, 0)
    );
  };

  // Check if all rows are selected
  const isAllSelected = data.length > 0 && selectedRows.length === data.length;
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < data.length;

  // Size classes
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const cellPadding = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`overflow-hidden ${bordered ? 'border border-gray-200 rounded-lg' : ''}`}>
        <div className="overflow-x-auto">
          <table className={`min-w-full divide-y divide-gray-200 ${sizeClasses[size]}`}>
            <thead className="bg-gray-50">
              <tr>
                {selectable && (
                  <th className={`${cellPadding[size]} w-12`}>
                    {multiSelect && (
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isAllSelected}
                          ref={(input) => {
                            if (input) {
                              input.indeterminate = isIndeterminate;
                            }
                          }}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                          aria-label="Select all rows"
                        />
                      </div>
                    )}
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`${cellPadding[size]} text-left font-medium text-gray-900 uppercase tracking-wider ${
                      column.sortable ? 'cursor-pointer select-none hover:bg-gray-100' : ''
                    }`}
                    onClick={() => column.sortable && handleSort(column)}
                    style={{ width: column.width }}
                    aria-sort={
                      sortState.column === column.dataIndex
                        ? sortState.direction === 'asc' ? 'ascending' : 'descending'
                        : 'none'
                    }
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.title}</span>
                      {column.sortable && (
                        <div className="flex flex-col">
                          <ChevronUp 
                            className={`w-3 h-3 -mb-1 ${
                              sortState.column === column.dataIndex && sortState.direction === 'asc'
                                ? 'text-blue-600'
                                : 'text-gray-400'
                            }`}
                          />
                          <ChevronDown 
                            className={`w-3 h-3 ${
                              sortState.column === column.dataIndex && sortState.direction === 'desc'
                                ? 'text-blue-600'
                                : 'text-gray-400'
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td 
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className={`${cellPadding[size]} text-center text-gray-500`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td 
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className={`${cellPadding[size]} text-center text-gray-500`}
                  >
                    {emptyText}
                  </td>
                </tr>
              ) : (
                data.map((record, index) => (
                  <tr
                    key={getRowKey(record, index)}
                    className={`${
                      hoverable ? 'hover:bg-gray-50' : ''
                    } ${isRowSelected(record) ? 'bg-blue-50' : ''}`}
                  >
                    {selectable && (
                      <td className={`${cellPadding[size]} w-12`}>
                        <div className="flex items-center">
                          <input
                            type={multiSelect ? "checkbox" : "radio"}
                            checked={isRowSelected(record)}
                            onChange={(e) => handleRowSelect(record, e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            aria-label={`Select row ${index + 1}`}
                          />
                        </div>
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`${cellPadding[size]} text-gray-900 whitespace-nowrap`}
                        style={{ width: column.width }}
                      >
                        {column.render
                          ? column.render(record[column.dataIndex], record, index)
                          : String(record[column.dataIndex] ?? '')
                        }
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {selectable && selectedRows.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          {selectedRows.length} row{selectedRows.length !== 1 ? 's' : ''} selected
        </div>
      )}
    </div>
  );
};