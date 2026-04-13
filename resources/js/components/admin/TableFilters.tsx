import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { router } from "@inertiajs/react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { DatePickerSimple } from "./DataPickerSimple";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { FilterIcon,  } from "lucide-react";

interface FilterOption {
    name: string;
    label: string;
    type: string;
    options?: { label: string; value: string }[];
}

export function TableFilters({ filters, queryParams = {} }: { filters: FilterOption[], queryParams: any }) {

    const handleFilterChange = (name: string, value: string) => {
        const newParams = { ...queryParams, [name]: value };

        if (value === 'all') delete newParams[name];

        router.get(route(route().current() as string), newParams, {
            preserveState: true,
            replace: true,
            preserveScroll: true,
        });
    };

    const handleDateChange = (range: DateRange | undefined) => {
        const newParams = { ...queryParams };

        if (range?.from) {
            newParams.start_date = format(range.from, "yyyy-MM-dd");
        } else {
            delete newParams.start_date;
        }

        if (range?.to) {
            newParams.end_date = format(range.to, "yyyy-MM-dd");
        } else {
            delete newParams.end_date;
        }

        router.get(route(route().current() as string), newParams, {
            preserveState: true,
            replace: true,
        });
    };



    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                    <FilterIcon className="h-3.5 w-3.5" />
                    Filters
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-80 p-4" align="start">
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                        <h4 className="font-medium leading-none">Filter Options</h4>

                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {filters.map((filter) => {
                            const filterKey = `filter-${filter.name}`;

                            if (filter.type === 'select') {
                                return (
                                    <Select
                                        key={filterKey}
                                        value={(queryParams && queryParams[filter.name]) ? String(queryParams[filter.name]) : "all"}
                                        onValueChange={(val) => handleFilterChange(filter.name, val)}
                                    >
                                        <SelectTrigger className="h-8 text-xs">
                                            <SelectValue placeholder={filter.label} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All {filter.label}</SelectItem>
                                            {(filter.options ?? []).map(opt => (
                                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                );
                            }

                            if (filter.type === 'date') {
                                return (
                                    <DatePickerSimple
                                        key={filter.name}
                                        date={queryParams[filter.name] ? new Date(queryParams[filter.name]) : undefined}
                                        onSelect={(date) => handleFilterChange(filter.name, date ? format(date, "yyyy-MM-dd") : 'all')}
                                        placeholder={filter.label}
                                    />
                                )
                            }

                            if (filter.type === 'date_range') {
                                return (
                                    <DatePickerWithRange
                                        key={filterKey}
                                        initialRange={{
                                            from: queryParams.start_date ? new Date(queryParams.start_date) : undefined,
                                            to: queryParams.end_date ? new Date(queryParams.end_date) : undefined,
                                        }}
                                        onChange={handleDateChange}
                                    />
                                );
                            }

                            return null;
                        })}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
