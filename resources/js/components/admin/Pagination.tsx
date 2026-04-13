import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTableFilters } from '@/hooks/useTableFilters';
import { PaginationType } from '@/types';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface Props<T> {
    data: PaginationType<T>;
    routeName: string;
}

const Pagination = <T extends { id: number }>({ data, routeName }: Props<T>) => {

    const {
        perPage,
        perPageOptions,
        handlePageChange,
        handlePerPageChange,
    } = useTableFilters({
        data: data,
        routeName: routeName,
    });

    return (
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
                        <ChevronsLeft />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handlePageChange(data.prev_page_url)}
                        disabled={data.current_page === 1}
                    >
                        <ChevronLeft />
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
                        onClick={() => handlePageChange(data.next_page_url)}
                        disabled={data.current_page === data.last_page}
                    >
                        <ChevronRight />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handlePageChange(data.last_page_url)}
                        disabled={data.current_page === data.last_page}
                    >
                        <ChevronsRight />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Pagination;
