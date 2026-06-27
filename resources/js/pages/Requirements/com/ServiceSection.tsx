import { Plus, Trash2 } from "lucide-react";
import ErrorMessage from "@/components/admin/form/ErrorMessage";
import FormLabel from "@/components/admin/form/FormLabel";
import { GenericCombobox } from "@/components/admin/form/GenericCombobox";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModal } from "@/contexts/ModalContext";
import type { RequirementServiceItem, Unit } from "@/types";

interface ServiceSectionProps {
    title: string;
    icon: React.ReactNode;
    hasService: boolean;
    onServiceToggle: (val: boolean) => void;
    prefix: string; // "accessories" or "installations"
    items: RequirementServiceItem[];
    setItems: (items: RequirementServiceItem[]) => void;
    units: Unit[];
    aitFactor: number;
    errors: any;
    onUnitCreated?: (unit: Unit) => void;
}

export const ServiceSection = ({ title, icon, hasService, onServiceToggle, prefix, items, setItems, units, aitFactor, errors, onUnitCreated }: ServiceSectionProps) => {
    const { openModal } = useModal();

    const addItem = () => {
        setItems([...items, { title: "", quantity: 1, unit_id: "", price: "" }]);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleItemChange = (index: number, field: keyof RequirementServiceItem, value: any) => {
        const newItems = [...items];
        (newItems[index] as any)[field] = value;
        setItems(newItems);
    };

    return (
        <div className={`bg-card border rounded-xl shadow-sm overflow-hidden mb-6 transition-all ${hasService ? 'ring-1 ring-primary/20 shadow-md' : 'border-border'}`}>
            <div className={`p-4 flex justify-between items-center border-b transition-colors ${hasService ? 'bg-primary/5 border-primary/10' : 'bg-muted/50 border-border'}`}>
                <h3 className={`font-semibold flex items-center gap-2 text-sm transition-colors ${hasService ? 'text-primary' : 'text-foreground'}`}>
                    {icon} {title}
                </h3>
                <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-3 bg-card/50 px-3 py-1.5 rounded-full border border-border/60 shadow-sm">
                        <Checkbox id={`has_${prefix}`} checked={hasService} onCheckedChange={onServiceToggle} className="data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                        <Label htmlFor={`has_${prefix}`} className="text-xs font-bold cursor-pointer text-muted-foreground">Include {title}</Label>
                    </div>
                </div>
            </div>
            {hasService && (
                <div className="p-6 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    {items.map((item, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end border-b pb-6 last:border-0 last:pb-0">
                            <div className="md:col-span-4 lg:col-span-4 space-y-2">
                                <FormLabel required>{title} Service Description</FormLabel>
                                <Input
                                    placeholder={`Enter ${title.toLowerCase()} details...`}
                                    value={item.title}
                                    onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                                    className="h-10 border-border focus:border-primary/50"
                                />
                                <ErrorMessage message={errors[`${prefix}.${index}.title`]} />
                            </div>
                            <div className="grid grid-cols-3 md:col-span-3 lg:col-span-3 gap-4">
                                <div className="space-y-2">
                                    <FormLabel required>QTY</FormLabel>
                                    <Input
                                        type="number"
                                        className="text-center h-10 font-bold border-border focus:border-primary/50"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                    />
                                    <ErrorMessage message={errors[`${prefix}.${index}.quantity`]} />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <GenericCombobox
                                    required
                                        label="Unit"
                                        items={units.map(u => ({ ...u, name: u.short_form }))}
                                        selectedId={item.unit_id}
                                        onSelect={(id, name) => handleItemChange(index, 'unit_id', id)}
                                        placeholder="Select Unit"
                                        searchPlaceholder="Search units..."
                                        allowManualInput={false}
                                        error={errors[`${prefix}.${index}.unit_id`]}
                                        renderAction={
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openModal('CREATE_UNIT', {
                                                        onSuccess: (unit: Unit) => {
                                                            onUnitCreated && onUnitCreated(unit);
                                                            handleItemChange(index, 'unit_id', unit.id);
                                                        }
                                                    });
                                                }}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        }
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2 lg:col-span-2 space-y-2">
                                <FormLabel >Sale Price</FormLabel>
                                <Input
                                    type="number"
                                    value={item.price}
                                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                                    className="h-10 font-bold border-border focus:border-primary/50"
                                />
                                <ErrorMessage message={errors[`${prefix}.${index}.price`]} />
                            </div>
                            <div className="md:col-span-2 lg:col-span-2 space-y-2">
                                <FormLabel>Total (Incl. AIT)</FormLabel>
                                <div className="h-10 flex items-center px-4 bg-primary/10 rounded-lg border border-primary/30 font-mono font-black text-sm text-primary shadow-inner">
                                    ৳{(Number(item.quantity || 0) * Number(item.price || 0) * aitFactor).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </div>
                            </div>
                            <div className="md:col-span-1 lg:col-span-1 flex justify-end">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                                    onClick={() => removeItem(index)}
                                    disabled={items.length === 1}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-center pt-2">
                        <Button type="button" variant="outline" size="sm" onClick={addItem} className="gap-2 px-6 h-9 bg-background border-border hover:bg-muted hover:border-primary/50 hover:text-primary transition-all">
                            <Plus className="w-4 h-4" /> Add New
                        </Button>
                    </div>
                    <ErrorMessage message={errors[`${prefix}`]} />
                </div>
            )}
        </div>
    );
};
