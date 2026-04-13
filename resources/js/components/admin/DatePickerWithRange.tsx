"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithRange({
    initialRange,
    onChange
}: {
    initialRange: DateRange | undefined,
    onChange: (range: DateRange | undefined) => void
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="h-8 justify-start text-xs font-normal px-2"
                >
                    <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                    {initialRange?.from ? (
                        initialRange.to ? (
                            <>{format(initialRange.from, "LLL dd")} - {format(initialRange.to, "LLL dd")}</>
                        ) : (format(initialRange.from, "LLL dd"))
                    ) : (<span>Pick a range</span>)}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="range"
                    selected={initialRange}
                    onSelect={onChange}
                    numberOfMonths={2}
                />
            </PopoverContent>
        </Popover>
    )
}
