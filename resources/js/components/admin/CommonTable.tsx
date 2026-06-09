import { Link } from '@inertiajs/react';
import { router } from "@inertiajs/react";
import { RotateCcw, Plus, FileUp } from 'lucide-react';
import type { ReactNode } from 'react';
import React from 'react';
import { useEffect, useState } from "react";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTableFilters } from '@/hooks/useTableFilters';
import { cn } from '@/lib/utils';
import type { CommonTableProps } from '@/types';
import { handleBulkDelete } from '@/utils/table';
import ImportModal from '../modals/ImportModal';
import { TableBulkActions } from '../table/TableBulkActions';
import { TableFilters } from '../table/TableFilters';
import TableSkeleton from '../table/TableSkeleton';
import Pagination from './Pagination';



function CommonTable<T extends { id: number }>({
    data,
    columns,
    create_route,
    routeName,
    filters,
    sortOptions = [],
    dataKey,
    bulkDeleteRoute,
    entityName,
    exportRoute,
    printRoute,
    importRoute
}: CommonTableProps<T> & { exportRoute?: string, printRoute?: string }) {

    const [loading, setLoading] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        const start = () => setLoading(true);
        const finish = () => setLoading(false);

        const unsubscribeStart = router.on('start', start);
        const unsubscribeFinish = router.on('finish', finish);

        return () => {
            unsubscribeStart?.();
            unsubscribeFinish?.();
        };
    }, []);
    const {
        queryParams,
        search,
        selectedItems,
        handleSearchChange,
        handleSelectAllItems,
        handleSelectItem,
        resetFilters,
        setSelectedItems
    } = useTableFilters({
        data: data,
        routeName: routeName,
        dataKey: dataKey
    });

    const handleExport = React.useCallback(() => {
        if (!exportRoute) return;

        // Use a hidden form or window.location to trigger download with selected IDs
        const url = new URL(route(exportRoute), window.location.origin);
        selectedItems.forEach(id => url.searchParams.append('ids[]', id.toString()));

        window.location.href = url.toString();
    }, [exportRoute, selectedItems]);

    const handlePrint = React.useCallback(() => {
        if (!printRoute) return;

        const url = new URL(route(printRoute), window.location.origin);
        selectedItems.forEach(id => url.searchParams.append('ids[]', id.toString()));

        window.open(url.toString(), '_blank');
    }, [printRoute, selectedItems]);

    const handleSortChange = React.useCallback((value: string) => {
        const option = sortOptions.find(opt => opt.label === value);
        if (!option) return;

        router.get(route(routeName), {
            ...queryParams,
            sort: option.sort,
            direction: option.direction,
            page: 1,
        }, {
            preserveState: true,
            replace: true,
            preserveScroll: true,
            ...(dataKey && { only: [dataKey] }),
        });
    }, [sortOptions, routeName, queryParams, dataKey]);

    const currentSort = React.useMemo(() => {
        return sortOptions.find(
            opt =>
                opt.sort === queryParams?.sort &&
                opt.direction === queryParams?.direction
        );
    }, [sortOptions, queryParams]);


    return (
        <div className="space-y-4">
            {/* Toolbar */}

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-col sm:flex-row flex-1 gap-2">
                        <Input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={handleSearchChange}
                            className="w-full sm:w-64 h-10 sm:h-9 px-3 text-sm"
                        />
                        <div className="w-full sm:w-auto flex items-center gap-2">                        {sortOptions && sortOptions.length > 0 && (
                            <Select
                                value={currentSort?.label || ""}
                                onValueChange={handleSortChange}
                            >
                                <SelectTrigger className="h-10 sm:h-9 w-full sm:w-44 text-xs bg-background">                                    <SelectValue placeholder="Sort By" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sortOptions.map((option) => (
                                        <SelectItem key={option.label} value={option.label}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            {filters && <TableFilters filters={filters} queryParams={queryParams || {}} routeName={routeName} />}
                            <Button variant="ghost" size="sm" onClick={resetFilters} className="h-9 px-2 text-xs text-destructive sm:h-8">
                                <RotateCcw className="mr-1 h-3 w-3" />
                                <span className="hidden xs:inline">Reset</span>
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                            {selectedItems.length > 0 && (
                                <Badge
                                    variant="secondary"
                                    className="font-medium animate-in fade-in zoom-in duration-200 h-9 sm:h-7 px-3"
                                >
                                    {selectedItems.length}
                                    <span className="hidden xs:inline ml-1">selected</span>
                                </Badge>
                            )}
                        </div>

                        <div className="grid grid-cols-2 sm:flex gap-2 w-full sm:w-auto">                        {importRoute && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-10 sm:h-9 gap-2 flex-1 sm:flex-none"
                                onClick={() => setIsImportModalOpen(true)}
                            >
                                <FileUp className="h-4 w-4" />
                                <span className="hidden sm:inline">Import</span>
                            </Button>
                        )}

                            {create_route && (
                                <Button
                                    size="sm"
                                    asChild
                                    className="h-10 sm:h-9 gap-2 flex-1 sm:flex-none"
                                >
                                    <Link href={route(create_route)}>
                                        <Plus className="h-4 w-4" />
                                        <span>
                                            Add <span className="hidden sm:inline">{entityName}</span>
                                        </span>
                                    </Link>
                                </Button>
                            )}

                            <div className="flex-1 sm:flex-none">
                                <TableBulkActions
                                    selectedItems={selectedItems}
                                    entityName={entityName}
                                    exportRoute={exportRoute}
                                    printRoute={printRoute}
                                    bulkDeleteRoute={bulkDeleteRoute}
                                    handleExport={handleExport}
                                    handlePrint={handlePrint}
                                    handleBulkDelete={(ids, bulkRoute) => {
                                        handleBulkDelete(ids, bulkRoute, {
                                            onSuccess: () => setSelectedItems(new Set()),
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            {/* Table Container */}
            {isMobile ? (
                <div className="space-y-4">
                    {loading ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-32 w-full animate-pulse bg-muted rounded-lg" />
                            ))}
                        </div>
                    ) : data.data.length === 0 ? (
                        <div className="h-32 flex items-center justify-center text-muted-foreground bg-card border rounded-lg">
                            No data found matching your criteria.
                        </div>
                    ) : (
                        data.data.map((item, i) => (
                            <div key={item.id} className="bg-card border rounded-lg p-4 space-y-3 relative shadow-sm">
                                <div className="flex items-start justify-between border-b pb-2">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(item.id)}
                                            onChange={() => handleSelectItem(item.id)}
                                            className="w-5 h-5 rounded border-gray-300 text-primary"
                                        />
                                        <span className="text-xs font-bold text-muted-foreground">#{(data.from ?? 1) + i}</span>
                                    </div>
                                    {/* Action column is usually the last one, let's try to find it */}
                                    <div className="flex flex-wrap gap-2 justify-end">                                        {columns.find(c => c.header === 'Actions' || c.className?.includes('action'))?.accessor(item)}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">                                    {columns.filter(c => c.header !== 'Actions' && !c.className?.includes('action')).map((column, colIndex) => (
                                    <div key={colIndex} className={cn("space-y-1", colIndex === 0 ? "col-span-2" : "")}>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                            {typeof column.header === 'string' ? column.header : ''}
                                        </p>
                                        <div className="text-sm">
                                            {typeof column.accessor === 'function'
                                                ? column.accessor(item)
                                                : (item[column.accessor as keyof T] as ReactNode)
                                            }
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <div className="border rounded-lg bg-card text-card-foreground shadow-sm">
                    <div className="w-full overflow-x-auto scrollbar-thin">                        <Table className="w-full min-w-max">
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                {/* Fixed widths for small utility columns */}
                                <TableHead className="w-12 px-4">
                                    <input
                                        type="checkbox"
                                        checked={data.data.length > 0 && selectedItems.length === data.data.length}
                                        onChange={handleSelectAllItems}
                                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary align-middle"
                                    />
                                </TableHead>
                                <TableHead className="w-16 font-bold text-xs">#</TableHead>

                                {columns.map((column, index) => (
                                    <TableHead
                                        key={index}
                                        className={cn(
                                            "font-bold overflow-hidden text-ellipsis truncate",
                                            column.className
                                        )}
                                        title={typeof column.header === 'string' ? column.header : undefined}
                                    >
                                        {column.header}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableSkeleton columns={columns.length + 2} />
                            ) : data.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length + 2}
                                        className="h-32 text-center text-muted-foreground"
                                    >
                                        No data found matching your criteria.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.data.map((item, i) => (
                                    <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
                                        <TableCell className='px-4'>
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(item.id)}
                                                onChange={() => handleSelectItem(item.id)}
                                                className="block w-4 h-4 rounded border-gray-300 text-primary"
                                            />
                                        </TableCell>

                                        <TableCell className="text-xs text-muted-foreground overflow-hidden text-ellipsis truncate">
                                            {data.from + i}
                                        </TableCell>

                                        {columns.map((column, colIndex) => (
                                            <TableCell
                                                key={colIndex}
                                                className={cn("py-3", column.className)}
                                            >
                                                <div
                                                    className="max-w-[250px] truncate"
                                                    title={
                                                        typeof column.accessor !== 'function'
                                                            ? String(item[column.accessor as keyof T] ?? '')
                                                            : undefined
                                                    }
                                                >                                                        {typeof column.accessor === 'function'
                                                    ? column.accessor(item)
                                                    : (item[column.accessor as keyof T] as ReactNode)
                                                    }
                                                </div>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    </div>
                </div>
            )}

            <Pagination routeName={routeName} data={data} />
            {importRoute && (
                <ImportModal
                    isOpen={isImportModalOpen}
                    onClose={() => setIsImportModalOpen(false)}
                    importRoute={importRoute}
                    entityName={entityName || 'Records'}
                />
            )}
        </div>
    );
}

export default CommonTable;
