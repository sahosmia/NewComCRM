import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTableFilters } from '@/hooks/useTableFilters';
import { PaginationType } from '@/types';
import { Link } from '@inertiajs/react';
import React, { ReactNode, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { TableFilters } from './TableFilters';
import { RotateCcw } from 'lucide-react';
import { router } from "@inertiajs/react";


interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
}

interface FilterOption {
    name: string;
    label: string;
    type: string;
    options?: { label: string; value: string }[];
}

interface CommonTableProps<T> {
    data: PaginationType<T>;
    columns: Column<T>[];
    create_route: string;
    routeName: string;
    filters: FilterOption[];
}

const CommonTable = <T extends { id: number }>({
    data,
    columns,
    create_route,
    routeName,
    filters,
}: CommonTableProps<T>) => {

    const {
        queryParams,
        perPage,
        search,
        perPageOptions,
        selectedItems,
        setSelectedItems,
        handleSearchChange,
        handlePageChange,
        handlePerPageChange,
        handleSelectAllItems,
        handleSelectItem,
    } = useTableFilters({
        data: data,
        routeName: routeName,
    });

    useEffect(() => {
        setSelectedItems([]);
    }, [data.data, setSelectedItems]);

    const resetFilters = () => {
        router.get(route(route().current() as string), {}, {
            replace: true,
            preserveState: false, // State clear korbe
        });
    };

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
                    {filters && <TableFilters filters={filters} queryParams={queryParams || {}} />}
                    <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2 text-xs text-destructive">
                        <RotateCcw className="mr-1 h-3 w-3" />
                        Reset
                    </Button>
                </div>
                <div className='flex gap-2 items-center'>

                    <div className="text-sm font-medium">
                        {selectedItems.length > 0 && (
                            <span className="text-primary">{selectedItems.length} items selected</span>
                        )}
                    </div>
                    <Button variant="default" size="sm" asChild>
                        <Link href={route(create_route)}>Add New</Link>
                    </Button>
                </div>
            </div>

            {/* Table Container */}
            <div className="border rounded-lg overflow-hidden bg-card text-card-foreground shadow-sm">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="w-[40px]">
                                <input
                                    type="checkbox"
                                    checked={data.data.length > 0 && selectedItems.length === data.data.length}
                                    onChange={handleSelectAllItems}
                                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                            </TableHead>
                            <TableHead className="w-[50px] font-bold">#</TableHead>
                            {columns.map((column, index) => (
                                <TableHead key={index} className={`${column.className} font-bold`}>
                                    {column.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.data.length === 0 ? (
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
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            // FIX: Check if THIS specific ID is in the selected list
                                            checked={selectedItems.includes(item.id)}
                                            onChange={() => handleSelectItem(item.id)}
                                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                    </TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-xs">
                                        {data.from + i}
                                    </TableCell>

                                    {columns.map((column, colIndex) => (
                                        <TableCell key={colIndex} className="py-3">
                                            {typeof column.accessor === 'function'
                                                ? column.accessor(item)
                                                : (item[column.accessor as keyof T] as ReactNode)
                                            }
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination & Footer */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-2">


                <div className="text-xs text-muted-foreground">
                    Showing {data.from ?? 0} to {data.to ?? 0} of {data.total} records
                </div>

                <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Rows per page</p>
                        <Select value={perPage} onValueChange={handlePerPageChange}>
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={perPage} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {perPageOptions.map((option) => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => handlePageChange(data.first_page_url)}
                            disabled={data.current_page === 1}
                        >
                            «
                        </Button>

                        {data.links.slice(1, -1).map((link, index) => (
                            <Button
                                key={index}
                                variant={link.active ? "default" : "outline"}
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => link.url && handlePageChange(link.url)}
                                disabled={!link.url}
                            >
                                {link.label}
                            </Button>
                        ))}

                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => handlePageChange(data.last_page_url)}
                            disabled={data.current_page === data.last_page}
                        >
                            »
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommonTable;
