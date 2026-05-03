import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { router } from "@inertiajs/react";
import { formatDateForInput } from "@/utils/date-format";
import type { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown, FilterIcon } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FilterOption } from "@/types";
import { DatePickerWithRange } from "../admin/DatePickerWithRange";
import { DatePickerSimple } from "../admin/DataPickerSimple";



export function TableFilters({ filters, queryParams = {}, routeName }: {
    filters: FilterOption[], queryParams: Record<string, any>, routeName: string
}) {
    const [openSelect, setOpenSelect] = useState<string | null>(null);

    const handleFilterChange = (name: string, value: string | number) => {
        const newParams = { ...queryParams, [name]: value, page: 1 };

        if (value === 'all') delete newParams[name];

        router.get(route(routeName), newParams, {
            preserveState: true,
            replace: true,
            preserveScroll: true,
        });
    };

    const handleDateChange = (range: DateRange | undefined) => {
        const newParams = { ...queryParams, page: 1 };

        if (range?.from) {
            newParams.start_date = formatDateForInput(range.from);
        } else {
            delete newParams.start_date;
        }

        if (range?.to) {
            newParams.end_date = formatDateForInput(range.to);
        } else {
            delete newParams.end_date;
        }

        router.get(route(routeName), newParams, {
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
                            const currentValue = queryParams[filter.name];

                            if (filter.type === 'select') {
                                return (
                                    <Select
                                        key={filterKey}
                                        value={currentValue ? String(currentValue) : "all"}
                                        onValueChange={(val) => handleFilterChange(filter.name, val)}
                                    >
                                        <SelectTrigger className="h-8 text-xs">
                                            <SelectValue placeholder={filter.label} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All {filter.label}</SelectItem>
                                            {(filter.options ?? []).map(opt => (
                                                <SelectItem key={String(opt.value)} value={String(opt.value)}>{opt.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                );
                            }

                            if (filter.type === 'searchSelect') {
                                const selectedOption = filter.options?.find(opt => String(opt.value) === String(currentValue));

                                return (
                                    <Popover
                                        key={filterKey}
                                        open={openSelect === filter.name}
                                        onOpenChange={(open) => setOpenSelect(open ? filter.name : null)}
                                    >
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn("h-8 w-full justify-between text-xs font-normal", !currentValue && "text-muted-foreground")}
                                            >
                                                {selectedOption ? selectedOption.label : `Select ${filter.label}...`}
                                                <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[250px] p-0 shadow-lg border">
                                            <Command>
                                                <CommandInput placeholder={`Search ${filter.label}...`} className="h-8 text-xs" />
                                                <CommandEmpty>No results found.</CommandEmpty>
                                                <CommandGroup className="max-h-48 overflow-auto">
                                                    <CommandItem
                                                        onSelect={() => {
                                                            handleFilterChange(filter.name, 'all');
                                                            setOpenSelect(null);
                                                        }}
                                                    >
                                                        <Check className={cn("mr-2 h-4 w-4", !currentValue ? "opacity-100" : "opacity-0")} />
                                                        All {filter.label}
                                                    </CommandItem>
                                                    {(filter.options ?? []).map((opt) => (
                                                        <CommandItem
                                                            key={String(opt.value)}
                                                            onSelect={() => {
                                                                handleFilterChange(filter.name, String(opt.value));
                                                                setOpenSelect(null);
                                                            }}
                                                        >
                                                            <Check className={cn("mr-2 h-4 w-4", String(currentValue) === String(opt.value) ? "opacity-100" : "opacity-0")} />
                                                            {opt.label}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                );
                            }

                            if (filter.type === 'date') {
                                return (
                                    <DatePickerSimple
                                        key={filterKey}
                                        date={currentValue ? new Date(currentValue) : undefined}
                                        onSelect={(date) => handleFilterChange(filter.name, date ? formatDateForInput(date) : 'all')}
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
