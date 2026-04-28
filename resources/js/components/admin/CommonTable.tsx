import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTableFilters } from '@/hooks/useTableFilters';
import { CommonTableProps } from '@/types';
import { Link } from '@inertiajs/react';
import React, { ReactNode } from 'react';
import { Input } from '@/components/ui/input';
import { TableFilters } from './TableFilters';
import { RotateCcw, Download, Printer, Plus } from 'lucide-react';
import { router } from "@inertiajs/react";
import Pagination from './Pagination';
import { useEffect, useState } from "react";
import TableSkeleton from './TableSkeleton';
import { handleBulkDelete } from '@/utils/table';
import { AlertDialogDestructive } from './AlertDialogDestructive';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Building2, Globe, Mail, MoreHorizontal, Phone, SquarePen, Trash2, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';



const CommonTable = <T extends { id: number }>({
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
    printRoute
}: CommonTableProps<T> & { exportRoute?: string, printRoute?: string }) => {

    const [loading, setLoading] = useState(false);
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
        resetFilters
    } = useTableFilters({
        data: data,
        routeName: routeName,
        dataKey: dataKey
    });

    const handleExport = () => {
        if (!exportRoute) return;

        // Use a hidden form or window.location to trigger download with selected IDs
        const url = new URL(route(exportRoute), window.location.origin);
        selectedItems.forEach(id => url.searchParams.append('ids[]', id.toString()));

        window.location.href = url.toString();
    };

    const handlePrint = () => {
        if (!printRoute) return;

        const url = new URL(route(printRoute), window.location.origin);
        selectedItems.forEach(id => url.searchParams.append('ids[]', id.toString()));

        window.open(url.toString(), '_blank');
    };

    const handleSortChange = (value: string) => {
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
    };

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

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 items-center space-x-2">
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={handleSearchChange}
                        className="w-64 h-9 px-3 text-sm"
                    />
                    {filters && <TableFilters filters={filters} queryParams={queryParams || {}} routeName={routeName}
                    />}

                    {sortOptions && sortOptions.length > 0 && (

                        <Select
                            value={currentSort?.label || ""}
                            onValueChange={handleSortChange}
                        >
                            <SelectTrigger className="h-9 w-45 text-xs bg-background">
                                <SelectValue placeholder="Sort By" />
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
                    <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2 text-xs text-destructive">
                        <RotateCcw className="mr-1 h-3 w-3" />
                        Reset
                    </Button>
                </div>
                <div className="flex items-center gap-3">
                    {/* Selection Status - Uses a Badge for better visual weight */}
                    {selectedItems.length > 0 && (
                        <Badge variant="secondary" className="font-medium animate-in fade-in zoom-in duration-200">
                            {selectedItems.length} selected
                        </Badge>
                    )}

                    {/* Primary Action: Create */}
                    <Button size="sm" asChild className="gap-2">
                        <Link href={route(create_route)}>
                            <Plus className="h-4 w-4" />
                            <span>Add {entityName}</span>
                        </Link>
                    </Button>

                    {/* Secondary Actions: Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-52">
                            {exportRoute && (
                                <DropdownMenuItem onClick={handleExport} className="cursor-pointer">
                                    <Download className="mr-2 h-4 w-4" />
                                    <span>Export {selectedItems.length > 0 ? 'Selected' : 'All'}</span>
                                </DropdownMenuItem>
                            )}

                            {printRoute && (
                                <DropdownMenuItem onClick={handlePrint} className="cursor-pointer">
                                    <Printer className="mr-2 h-4 w-4" />
                                    <span>Print {selectedItems.length > 0 ? 'Selected' : 'All'}</span>
                                </DropdownMenuItem>
                            )}

                            {selectedItems.length > 0 && (
                                <>
                                    <DropdownMenuSeparator />
                                    <AlertDialogDestructive
                                        title={`Delete ${selectedItems.length} ${entityName}s?`}
                                        description="This action cannot be undone. This will permanently delete the selected records."
                                        onConfirm={() => handleBulkDelete(selectedItems, bulkDeleteRoute || '')}
                                    >
                                        {/* We use DropdownMenuItem as the trigger for the Dialog */}
                                        <DropdownMenuItem
                                            onSelect={(e) => e.preventDefault()}
                                            className="text-red-600 focus:text-red-600 cursor-pointer"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            <span>Delete Selected</span>
                                        </DropdownMenuItem>
                                    </AlertDialogDestructive>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Table Container */}
            {/* 1. Added horizontal scroll wrapper and removed 'table-fixed' */}
<div className="border rounded-lg bg-card text-card-foreground shadow-sm">
    <div className="overflow-x-auto overflow-y-hidden">
        <Table className='w-full min-w-[800px] md:min-w-full'>
            <TableHeader className="bg-muted/50">
                <TableRow>
                    {/* Fixed widths for small utility columns */}
                    <TableHead className="w-[40px] px-4">
                        <input
                            type="checkbox"
                            checked={data.data.length > 0 && selectedItems.length === data.data.length}
                            onChange={handleSelectAllItems}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary align-middle"
                        />
                    </TableHead>
                    <TableHead className="w-[50px] font-bold text-xs">#</TableHead>

                    {columns.map((column, index) => (
                        <TableHead
                            key={index}
                            className={cn(
                                "font-bold whitespace-nowrap",
                                column.className
                            )}
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

                            <TableCell className="text-xs text-muted-foreground">
                                {data.from + i}
                            </TableCell>

                            {columns.map((column, colIndex) => (
                                <TableCell
                                    key={colIndex}
                                    className={cn("py-3", column.className)}
                                >
                                    <div className="max-w-full">
                                        {typeof column.accessor === 'function'
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

            <Pagination routeName={routeName} data={data} />
        </div>
    );
};

export default CommonTable;
