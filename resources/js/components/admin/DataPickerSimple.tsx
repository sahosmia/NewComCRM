"use client"

import { CalendarIcon } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { formatDisplayDate } from "@/utils/date-format"

interface DatePickerSimpleProps {
  date?: Date;
  onSelect: (date: Date | undefined) => void;
  placeholder?: string;
}

export function DatePickerSimple({ date, onSelect, placeholder = "Pick a date" }: DatePickerSimpleProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "h-8 justify-start text-left font-normal px-2 text-xs",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-3 w-3" />
            {date ? formatDisplayDate(date) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              onSelect(selectedDate);
              setOpen(false);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
