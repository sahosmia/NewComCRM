import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { Input } from "@/components/ui/input";
import FormLabel from "./FormLabel";

interface Item {
    id: string | number;
    name: string;
}

interface GenericComboboxProps {
    label: string;
    items: Item[];
    selectedId?: string | number;
    manualValue?: string;
    onSelect: (id: string | number | "", name: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    allowManualInput?: boolean;
    className?: string;
}

export function GenericCombobox({
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
}: GenericComboboxProps) {
    const [open, setOpen] = React.useState(false);

    // Find the current label based on ID or manual fallback
    const selectedItem = items.find((item) => String(item.id) === String(selectedId));
    const displayLabel = selectedItem ? selectedItem.name : (manualValue || placeholder);

    return (
        <>
            <FormLabel>{label}</FormLabel>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn("w-full justify-between font-normal", !selectedId && !manualValue && "text-muted-foreground", className)}
                    >
                        <span className="truncate">{displayLabel}</span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                    <Command>
                        <CommandInput placeholder={searchPlaceholder} />
                        <CommandEmpty>
                            <div className="p-2 space-y-2">
                                <p className="text-xs text-muted-foreground">{emptyText}</p>
                                {allowManualInput && (
                                    <Input
                                        placeholder="Or type manual name..."
                                        className="h-8 text-xs"
                                        value={manualValue || ""}
                                        onChange={(e) => onSelect("", e.target.value)}
                                    />
                                )}
                            </div>
                        </CommandEmpty>
                        <CommandGroup className="max-h-60 overflow-auto">
                            {items.map((item) => (
                                <CommandItem
                                    key={item.id}
                                    value={item.name}
                                    onSelect={() => {
                                        onSelect(item.id, item.name);
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
        </>
    );
}
