export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  width?: string | number;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  multiSelect?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  onSort?: (dataIndex: keyof T, direction: 'asc' | 'desc' | null) => void;
  className?: string;
  rowKey?: keyof T | ((record: T) => string | number);
  emptyText?: string;
  size?: 'sm' | 'md' | 'lg';
  bordered?: boolean;
  hoverable?: boolean;
}

export interface SortState<T> {
  column: keyof T | null;
  direction: 'asc' | 'desc' | null;
}