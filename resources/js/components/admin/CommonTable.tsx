import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTableFilters } from '@/hooks/useTableFilters';
import { CommonTableProps } from '@/types';
import { Link } from '@inertiajs/react';
import React, { ReactNode } from 'react';
import { Input } from '@/components/ui/input';
import { TableFilters } from './TableFilters';
import { RotateCcw } from 'lucide-react';
import { router } from "@inertiajs/react";
import Pagination from './Pagination';
import { useEffect, useState } from "react";
import TableSkeleton from './TableSkeleton';
import { handleBulkDelete } from '@/utils/table';
import { AlertDialogDestructive } from './AlertDialogDestructive';

const CommonTable = <T extends { id: number }>({
    data,
    columns,
    create_route,
    routeName,
    filters,
    sortOptions
}: CommonTableProps<T>) => {

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
    });

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
                <div className='flex gap-2 items-center'>
                    {selectedItems.length > 0 && (
                        <AlertDialogDestructive
                            title="Delete Selected Customers?"
                            description={`This will delete ${selectedItems.length} customers permanently.`}
                            onConfirm={() => handleBulkDelete(selectedItems, 'customers.bulkDestroy')}
                        >
                            <Button
                                variant="destructive"
                                size="sm"
                            >
                                Delete ({selectedItems.length})
                            </Button>
                        </AlertDialogDestructive>
                    )}
                    {/* <div className="text-sm font-medium">
                        {selectedItems.length > 0 && (
                            <span className="text-primary">{selectedItems.length} items selected</span>
                        )}
                    </div> */}
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
                            <TableHead className="w-2">
                                <input
                                    type="checkbox"
                                    checked={data.data.length > 0 && selectedItems.length === data.data.length}
                                    onChange={handleSelectAllItems}
                                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                            </TableHead>
                            <TableHead className="w-2 font-bold">#</TableHead>
                            {columns.map((column, index) => (
                                <TableHead key={index} className={`${column.className} font-bold`}>
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
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(item.id)}
                                            onChange={() => handleSelectItem(item.id)}
                                            className="w-4 h-4"
                                        />
                                    </TableCell>

                                    <TableCell className="text-xs">
                                        {data.from + i}
                                    </TableCell>

                                    {columns.map((column, colIndex) => (
                                        <TableCell key={colIndex}>
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

            <Pagination routeName={routeName} data={data} />
        </div>
    );
};

export default CommonTable;
