"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

// Sort direction enum
type SortDirection = "asc" | "desc" | null;

// Column definition interface
export interface DataTableColumn<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  accessorFn?: (row: T) => any;
  cell?: (value: any, row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  sortType?: "text" | "number" | "date";
  searchable?: boolean; // Whether this column should be included in global search
  className?: string;
  headerClassName?: string;
}

// Main props interface
export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  isLoading?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  onRowClick?: (row: T, event: React.MouseEvent) => void;
  rowClickCondition?: (row: T) => boolean;
  actions?: (row: T, index: number) => React.ReactNode;
  topActions?: React.ReactNode;
  className?: string;
  searchBarClassName?: string;
}

// Utility functions for sorting
const sortData = <T,>(
  data: T[],
  sortColumn: string | null,
  sortDirection: SortDirection,
  columns: DataTableColumn<T>[]
) => {
  if (!sortColumn || !sortDirection) return data;

  const column = columns.find(col => col.id === sortColumn);
  if (!column || !column.sortable) return data;

  return [...data].sort((a, b) => {
    let aVal: any;
    let bVal: any;

    // Get values using accessor
    if (column.accessorFn) {
      aVal = column.accessorFn(a);
      bVal = column.accessorFn(b);
    } else if (column.accessorKey) {
      aVal = a[column.accessorKey as keyof T];
      bVal = b[column.accessorKey as keyof T];
    } else {
      return 0;
    }

    // Handle null/undefined values
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return sortDirection === "asc" ? -1 : 1;
    if (bVal == null) return sortDirection === "asc" ? 1 : -1;

    // Sort based on type
    switch (column.sortType) {
      case "number":
        const numA = typeof aVal === "number" ? aVal : parseFloat(aVal?.toString() || "0");
        const numB = typeof bVal === "number" ? bVal : parseFloat(bVal?.toString() || "0");
        return sortDirection === "asc" ? numA - numB : numB - numA;

      case "date":
        const dateA = new Date(aVal).getTime();
        const dateB = new Date(bVal).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;

      case "text":
      default:
        const strA = aVal?.toString().toLowerCase() || "";
        const strB = bVal?.toString().toLowerCase() || "";
        if (strA < strB) return sortDirection === "asc" ? -1 : 1;
        if (strA > strB) return sortDirection === "asc" ? 1 : -1;
        return 0;
    }
  });
};

// Filter data based on search query
const filterData = <T,>(
  data: T[],
  searchQuery: string,
  columns: DataTableColumn<T>[]
) => {
  if (!searchQuery.trim()) return data;

  const query = searchQuery.toLowerCase();
  const searchableColumns = columns.filter(col => col.searchable !== false);

  return data.filter(row => {
    return searchableColumns.some(column => {
      let value: any;

      if (column.accessorFn) {
        value = column.accessorFn(row);
      } else if (column.accessorKey) {
        value = row[column.accessorKey as keyof T];
      }

      if (value == null) return false;

      // Handle nested objects for search
      if (typeof value === "object") {
        return JSON.stringify(value).toLowerCase().includes(query);
      }

      return value.toString().toLowerCase().includes(query);
    });
  });
};

export function DataTable<T>({
  data,
  columns,
  isLoading = false,
  searchPlaceholder = "Ara...",
  emptyMessage = "Veri bulunamadı.",
  loadingMessage = "Yükleniyor...",
  onRowClick,
  rowClickCondition,
  actions,
  topActions,
  className,
  searchBarClassName,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Process data: filter first, then sort
  const processedData = useMemo(() => {
    const filtered = filterData(data, searchQuery, columns);
    return sortData(filtered, sortColumn, sortDirection, columns);
  }, [data, searchQuery, sortColumn, sortDirection, columns]);

  // Handle column header click for sorting
  const handleSort = (columnId: string) => {
    const column = columns.find(col => col.id === columnId);
    if (!column?.sortable) return;

    if (sortColumn !== columnId) {
      setSortColumn(columnId);
      setSortDirection("asc");
    } else {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortColumn(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    }
  };

  // Handle row click
  const handleRowClick = (row: T, event: React.MouseEvent) => {
    if (!onRowClick) return;

    // Check row click condition if provided
    if (rowClickCondition && !rowClickCondition(row)) return;

    // Don't navigate if clicking on interactive elements
    const target = event.target as HTMLElement;
    if (
      target.closest("a") ||
      target.closest("button") ||
      target.closest('[role="button"]') ||
      target.closest('[data-no-row-click]')
    ) {
      return;
    }

    onRowClick(row, event);
  };

  // Get cell value for rendering
  const getCellValue = (row: T, column: DataTableColumn<T>, index: number) => {
    let value: any;

    if (column.accessorFn) {
      value = column.accessorFn(row);
    } else if (column.accessorKey) {
      value = row[column.accessorKey as keyof T];
    }

    if (column.cell) {
      return column.cell(value, row, index);
    }

    return value;
  };

  // Render sort icon
  const renderSortIcon = (columnId: string) => {
    if (sortColumn !== columnId) {
      return <Icons.chevronUp className="ml-2 h-4 w-4 opacity-50" />;
    }

    if (sortDirection === "asc") {
      return <Icons.chevronUp className="ml-2 h-4 w-4" />;
    }

    if (sortDirection === "desc") {
      return <Icons.chevronDown className="ml-2 h-4 w-4" />;
    }

    return <Icons.chevronUp className="ml-2 h-4 w-4 opacity-50" />;
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header with search and actions */}
      <div className="flex items-center justify-between gap-4">
        <div className={cn("flex items-center gap-2 flex-1", searchBarClassName)}>
          <div className="relative max-w-sm">
            <Icons.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        {topActions && (
          <div className="flex items-center gap-2">
            {topActions}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className={cn(
                    column.headerClassName,
                    column.sortable && "cursor-pointer select-none hover:bg-muted/50"
                  )}
                  onClick={() => column.sortable && handleSort(column.id)}
                >
                  <div className="flex items-center">
                    {column.header}
                    {column.sortable && renderSortIcon(column.id)}
                  </div>
                </TableHead>
              ))}
              {actions && (
                <TableHead className="text-right">İşlemler</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell 
                  colSpan={columns.length + (actions ? 1 : 0)} 
                  className="h-24 text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Icons.spinner className="h-4 w-4 animate-spin" />
                    {loadingMessage}
                  </div>
                </TableCell>
              </TableRow>
            ) : processedData.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={columns.length + (actions ? 1 : 0)} 
                  className="h-24 text-center text-muted-foreground"
                >
                  {data.length === 0 
                    ? emptyMessage 
                    : searchQuery 
                      ? "Arama kriterlerine uygun sonuç bulunamadı." 
                      : emptyMessage
                  }
                </TableCell>
              </TableRow>
            ) : (
              processedData.map((row, index) => (
                <TableRow
                  key={index}
                  className={cn(
                    onRowClick && (!rowClickCondition || rowClickCondition(row))
                      ? "cursor-pointer hover:bg-muted/50 transition-colors"
                      : "cursor-default"
                  )}
                  onClick={(event) => handleRowClick(row, event)}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      className={column.className}
                    >
                      {getCellValue(row, column, index)}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell className="text-right" data-no-row-click>
                      {actions(row, index)}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Results info */}
      {!isLoading && data.length > 0 && (
        <div className="text-xs text-muted-foreground">
          {searchQuery
            ? `${processedData.length} sonuç gösteriliyor (${data.length} toplam)`
            : `Toplam ${data.length} kayıt`
          }
        </div>
      )}
    </div>
  );
} 