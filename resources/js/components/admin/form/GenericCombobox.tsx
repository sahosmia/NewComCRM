import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import ErrorMessage from "./ErrorMessage";
import FormLabel from "./FormLabel";

interface BaseItem {
    id: string | number;
    name: string;
}

interface GenericComboboxProps<T extends BaseItem> {
    label?: string;
    items: T[];
    selectedId?: string | number;
    manualValue?: string;
    onSelect: (id: string | number | "", name: string, item?: T) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    allowManualInput?: boolean;
    className?: string;
    renderAction?: React.ReactNode;
    required?: boolean;
    error?: string;
}

export function GenericCombobox<T extends BaseItem>({
    label,
    items,
    selectedId,
    manualValue,
    onSelect,
    placeholder = "Select item...",
    searchPlaceholder = "Search...",
    emptyText = "No item found.",
    allowManualInput = true,
    className,
    renderAction,
    required = false,
    error
}: GenericComboboxProps<T>) {
    const [open, setOpen] = React.useState(false);

    // Find the current label based on ID or manual fallback
    const selectedItem = items.find((item) => String(item.id) === String(selectedId));
    const displayLabel = selectedItem ? selectedItem.name : (manualValue || placeholder);

    return (
        <>
            {label && <FormLabel required={required}>{label}</FormLabel>}

            <div className="relative">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            type="button"
                            aria-expanded={open}
                            className={cn("w-full justify-between font-normal text-left h-11 md:h-10", renderAction && "pr-10", !selectedId && !manualValue && "text-muted-foreground", error && "border-destructive", className)}
                        >
                            <span className="truncate">{displayLabel}</span>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    {renderAction && (
                        <div className="absolute right-8 top-1/2 -translate-y-1/2">
                            {renderAction}
                        </div>
                    )}
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                        <Command>
                            <CommandInput placeholder={searchPlaceholder} />
                            <CommandEmpty>
                                <div className="p-2 space-y-2">
                                    <p className="text-xs text-muted-foreground">{emptyText}</p>
                                </div>
                            </CommandEmpty>
                            <CommandGroup className="max-h-60 overflow-auto">
                                {items.map((item) => (
                                    <CommandItem
                                        key={item.id}
                                        value={item.name}
                                        onSelect={() => {
                                            onSelect(item.id, item.name, item);
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                String(selectedId) === String(item.id) ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {item.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
            <ErrorMessage message={error} />
        </>
    );
}
